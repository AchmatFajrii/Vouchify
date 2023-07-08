import { Request, Response } from "express";
import { VoucherService } from "./voucher.service";
import { GameService } from "../game/game.service";
import { plainToClass } from "class-transformer";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { toObject } from "../utils/provider/convert.provider";
import { validate } from "class-validator";
import { FindAllVoucherDto } from "./dto/find-all-voucher.dto";
import { UpdateVoucherDto } from "./dto/update-voucher.dto";
import { FindAllVoucherByGameIdDto } from "./dto/find-all-voucher-by-game-id.dto";

const voucherService = new VoucherService();
const gameService = new GameService();

class VoucherController {
    async create(req: Request, res: Response) {
        let voucher, message;
        const { gameId } = req.body;

        // find game category to validate
        const game = await gameService.findOne(gameId);

        if (game) {
            const { voucherTypeId } = req.body;

            const voucherType = await gameService.findVoucherTypeById(voucherTypeId);

            if (voucherType) {
                const { name, price } = req.body;

                const data = new CreateVoucherDto();

                data.name = name;
                data.price = price;
                data.gameId = gameId;
                data.voucherTypeId = voucherTypeId;

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

                message = "Success create a new voucher";

                voucher = await voucherService.create(data);
            } else {
                message = "Voucher type not found";
            }
        } else {
            message = "Game not found";
        }

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": voucher != undefined
                ? toObject(voucher)
                : null
        });
    }

    async findAllByGameId(req: Request, res: Response) {
        const { gameId } = req.params;

        const data = new FindAllVoucherByGameIdDto();

        // Validation
        data.gameId = gameId;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed fetch vouchers"
                },
                "data": errors
            });;
        }
        
        const vouchers = await voucherService.findAllByGameId(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch voucher",
            },
            "data": vouchers != undefined
                ? toObject(vouchers)
                : null
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;

        const data = new FindAllVoucherDto();

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

        const vouchers = await voucherService.findAll(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch voucher",
                "links": {
                    "skip": skip,
                    "take": take,
                }
            },
            "data": vouchers != undefined
                ? toObject(vouchers)
                : null
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;

        const voucher = await voucherService.findOne(id);

        return res.status(200).json({
            "meta": {
                "message": "Success get voucher",
            },
            "data": toObject(voucher)
        });
    }

    async update(req: Request, res: Response) {
        var voucher, message: string;
        const { id } = req.params;
        const { name, price, gameId, voucherTypeId } = req.body;

        if (gameId) {
            const game = await gameService.findOne(gameId);

            if (!game) {
                return res.status(400).json({
                    "meta": {
                        "message": "Game not found"
                    },
                    "data": null
                });
            }
        }

        if (voucherTypeId) {
            const game = await voucherService.findVoucherTypeById(voucherTypeId);

            if (!game) {
                return res.status(400).json({
                    "meta": {
                        "message": "Voucher type not found"
                    },
                    "data": null
                });
            }
        }

        const data = new UpdateVoucherDto();

        data.name = name;
        data.price = price;
        data.gameId = gameId;
        data.voucherTypeId = voucherTypeId;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update special offer"
                },
                "data": errors
            });
        }

        voucher = await voucherService.update(id, data);

        message = "Success update a voucher";

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": voucher != undefined
                ? toObject(voucher)
                : null
        });
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;
        const voucher = await voucherService.remove(id);

        return res.status(200).json({
            "meta": {
                "message": "Success delete a voucher game"
            },
            "data": toObject(voucher) ?? null
        });
    }
}

export default new VoucherController();