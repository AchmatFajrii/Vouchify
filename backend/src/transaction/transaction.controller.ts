import nodemailer from "nodemailer";
import { Request, Response } from "express";
import Mailgen from "mailgen";
import path from "path";
import { plainToClass } from "class-transformer";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionService } from "./transaction.service";
import { toObject } from "../utils/provider/convert.provider";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { validate } from "class-validator";
import { FindAllTransactionByUserDto } from "./dto/find-all-transaction-by-user.dto";
import { TrackingTransactionDto } from "./dto/tracking-transaction.dto";
import { ConfirmationTransactionDto } from "./dto/confirmation-transaction.dto";
import { FolderLocation, uploadImageProvider } from "../utils/provider/image-upload.provider";
import { CreateTransactionHistoryDto } from "./dto/create-transaction-history.dto";

const fs = require("fs")
const hbs = require('nodemailer-express-handlebars');
const handlebars = require("handlebars")
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template/email.hbs"), "utf8")
const transactionService = new TransactionService();

class TransactionController {
    async create(req: any, res: Response) {
        const { userId } = req.payload;
        const { voucherId: voucherId, discountId: discountId } = req.body;
        const currentDate: Date = new Date();
        const transactionNumber: string = "TR" + currentDate.getSeconds().toString() + currentDate.valueOf().toString();

        const user = await transactionService.findUserById(userId);
        const voucher = await transactionService.findVoucherById(voucherId);
        const discount = await transactionService.findDiscountById(discountId);

        var discountValue = 0;
        if (discount?.type == 'Price') {
            discountValue = Number(discount.value);
        } else {
            const vp: number = Number(voucher?.price ?? 0);
            const dv: number = Number(discount?.value ?? 0);
            const calculatVpDv = (vp * dv);

            if (calculatVpDv == 0) {
                discountValue = 0;
            } else {
                discountValue = Number(calculatVpDv / 100);
            }
        }
        const price: number = Number(voucher?.price ?? 0);

        const data: CreateTransactionDto = new CreateTransactionDto();

        data.transactionNumber = transactionNumber;
        data.userId = userId;
        data.voucherId = voucherId;
        data.price = price;
        data.discount = discountValue;

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed while create a new transaction"
                },
                "data": errors
            });;
        }

        const transaction = await transactionService.create(data);

        const dataTransactionHistory: CreateTransactionHistoryDto = new CreateTransactionHistoryDto();

        dataTransactionHistory.title = 'Create transaction';
        dataTransactionHistory.description = "Create a new transaction";
        dataTransactionHistory.transactionId = transaction.id;

        transactionService.createTransactionHistory(dataTransactionHistory);

        return res.status(200).json({
            "meta": {
                "message": "Success create a new transaction"
            },
            "data": toObject(transaction) ?? null
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;

        const data = new UpdateTransactionDto();

        data.status = status;

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed fetch voucher type"
                },
                "data": errors
            });;
        }

        const transaction = await transactionService.update(id, data);

        const dataTransactionHistory: CreateTransactionHistoryDto = new CreateTransactionHistoryDto();

        dataTransactionHistory.title = 'Update transaction';
        dataTransactionHistory.description = "Update transaction";
        dataTransactionHistory.transactionId = transaction.id;

        transactionService.createTransactionHistory(dataTransactionHistory);

        return res.status(200).json({
            "meta": {
                "message": "Success update a transaction"
            },
            "data": toObject(transaction) ?? null
        });
    }

    async confirmation(req: Request, res: Response) {
        const { id } = req.params;
        const { image } = req.body;
        let message, transaction;

        if (image) {
            const file = "data:image/png;base64," + image;
            const data = new ConfirmationTransactionDto();

            data.status = 'Pending';

            // Upload image to cloudinary
            await uploadImageProvider(file, FolderLocation.Transaction).then(value => {
                console.log(value);
                if (value.status == 'success') {
                    data.cloudinaryPublicId = value.publicId;
                    data.image = value.url;

                    message = 'Success upload image';
                } else {
                    message = 'Failed while upload image';
                }
            });

            // Validation query parameter
            const errors = await validate(data);
            if (errors.length > 0) {
                return res.status(400).json({
                    "meta": {
                        "message": "Failed fetch voucher type"
                    },
                    "data": errors
                });;
            }

            transaction = await transactionService.confirmation(id, data);

            const dataTransactionHistory: CreateTransactionHistoryDto = new CreateTransactionHistoryDto();

            dataTransactionHistory.title = 'Confirmation transaction';
            dataTransactionHistory.description = "Confirmation transaction";
            dataTransactionHistory.transactionId = transaction.id;

            transactionService.createTransactionHistory(dataTransactionHistory);
        } else {
            message = 'Please insert an image';
        }

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": null
        });

    }

    async findAllByUser(req: any, res: Response) {
        const { userId } = req.payload;
        const { skip, take } = req.query;

        const data = new FindAllTransactionByUserDto();

        // Pagination
        data.skip = parseInt(skip as string);
        data.take = parseInt(take as string);

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed fetch transaction"
                },
                "data": errors
            });;
        }

        const transactions = await transactionService.findTransactionByUserId(userId, data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch transaction",
                "links": {
                    "skip": skip,
                    "take": take,
                },
            },
            "data": toObject(transactions)
        });
    }

    async sendInvoice(req: any, res: Response) {
        const { userId } = req.payload;
        const { id } = req.params;
        const transaction = await transactionService.findOne(id);
        const gameId = transaction?.voucher.gameId;

        if (gameId) {
            const user = await transactionService.findUserById(userId);
            const game = await transactionService.findGameByGameId(gameId);

            // Nodemailer configuration
            const transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_HOST,
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_AUTH_USER,
                    pass: process.env.MAILTRAP_AUTH_PASSWORD,
                }
            });

            // Custom template
            const handlebarOptions = {
                viewEngine: {
                    extName: ".handlebars",
                    partialsDir: path.resolve("./src/transaction/template"),
                    defaultLayout: false,
                },
                viewPath: path.resolve("./src/transaction/template"),
                extName: ".handlebars"
            };

            transporter.use("compile", hbs(handlebarOptions));

            // Body of email
            const template = handlebars.compile(emailTemplateSource)
            const dateObj = new Date();
            const month = dateObj.toLocaleString('default', { month: 'long' }); //months from 1-12
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();
            const emailBody = template({
                to: user?.name || '',
                body: {
                    transaction: toObject(transaction) ?? null,
                    game: toObject(game) ?? null,
                    date: month + " " + day + " " + year,
                    grandTotal: Number(transaction.price - transaction.discount)
                }
            })

            // Send mail with defined transport object
            if (user != null && user.email != null) {
                const mailOptions = {
                    from: process.env.MAILTRAP_EMAIL,
                    to: user.email,
                    subject: 'Invoice',
                    template: 'email',
                    html: emailBody
                };

                // Sending email (async method)
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);


                        const dataTransactionHistory: CreateTransactionHistoryDto = new CreateTransactionHistoryDto();

                        dataTransactionHistory.title = 'Send email';
                        dataTransactionHistory.description = "Send invoice to customer";
                        dataTransactionHistory.transactionId = transaction.id;

                        transactionService.createTransactionHistory(dataTransactionHistory);
                    }
                });
            }
        }

        return res.status(200).json();
    }

    async trackingTransaction(req: any, res: Response) {
        const { userId } = req.payload;
        const { transactionNumber } = req.params;

        const data = new TrackingTransactionDto();

        // Pagination
        data.transactionNumber = transactionNumber;

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed tracking transaction"
                },
                "data": errors
            });;
        }

        const transaction = await transactionService.findByTransactionNumber(data);

        if (transaction?.userId != userId) {
            return res.status(200).json({
                "meta": {
                    "message": "Your transaction not found!"
                },
                "data": ""
            });
        }

        return res.status(200).json({
            "meta": {
                "message": "Your transaction found!"
            },
            "data": toObject(transaction)
        });
    }
}

export default new TransactionController();