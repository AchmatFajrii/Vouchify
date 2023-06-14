import { Request, Response } from "express";
import { SpecialOfferService } from "./special-offer.service";
import { plainToClass } from "class-transformer";
import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { FindAllSpecialOfferDto } from "./dto/find-all-special-offer.dto";
import { validate } from "class-validator";
import { toObject } from "../utils/provider/convert.provider";

const specialOfferService = new SpecialOfferService();

class SpecialOfferController {
    async create(req: Request, res: Response) {
        var specialOffer, message;
        const { voucherId } = req.body;

        if (voucherId) {
            const voucher = await specialOfferService.findVoucherById(voucherId);

            if (voucher) {
                const { name, description, price, from, to } = req.body;

                const data = new CreateSpecialOfferDto();

                data.name = name;
                data.description = description;
                data.price = price;
                data.from = new Date(from);
                data.to = new Date(to);
                data.voucherId = voucherId;

                // Validation query parameter
                const errors = await validate(data);
                if (errors.length > 0) {
                    return res.status(400).json({
                        "meta": {
                            "message": "Failed create a special offer"
                        },
                        "data": errors
                    });;
                }

                specialOffer = await specialOfferService.create(data);

                message = 'Success create a special offer';
            } else {
                message = 'Voucher not found';
            }
        } else {
            message = 'Please insert voucher id';
        }

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": specialOffer != undefined
                ? toObject(specialOffer)
                : null
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;

        const data = new FindAllSpecialOfferDto();

        // Pagination
        data.skip = parseInt(skip as string);
        data.take = parseInt(take as string);

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed fetch game category"
                },
                "data": errors
            });;
        }

        const specialOffers = await specialOfferService.findAll(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch special offer",
                "links": {
                    "skip": skip,
                    "take": take,
                }
            },
            "data": toObject(specialOffers)
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const specialOffer = await specialOfferService.findOne(id);

        return res.status(200).json({
            "meta": {
                "message": "Success get sprcial offer"
            },
            "data": toObject(specialOffer) ?? null
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, from, to } = req.body;

        const data = new UpdateSpecialOfferDto();

        data.name = name;
        data.description = description;
        data.price = price;
        data.from = new Date(from);
        data.to = new Date(to);

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update special offer"
                },
                "data": errors
            });
        }

        const specialOffer = await specialOfferService.update(id, data);

        return res.status(200).json({
            "meta": {
                "message": "Success update special offer"
            },
            "data": toObject(specialOffer) ?? null
        });
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;
        const specialOffer = await specialOfferService.remove(id);

        return res.status(200).json({
            "meta": {
                "message": "Success delete special offer"
            },
            "data": toObject(specialOffer)
        });
    }
}

export default new SpecialOfferController();