import { Request, Response } from "express";
import { VoucherTypeService } from "./voucher-type.service";
import { CreateVoucherTypeDto } from "./dto/create-voucher-type.dto";
import { toObject } from "../utils/provider/convert.provider";
import { FindAllVoucherTypeDto } from "./dto/find-all-voucher-type.dto";
import { validate } from "class-validator";
import { UpdateVoucherTypeDto } from "./dto/update-voucher-type.dto";

const voucherTypeService = new VoucherTypeService();

class VoucherTypeController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body;
        const data = new CreateVoucherTypeDto();

        data.name = name;
        data.description = description;

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

        const voucherType = await voucherTypeService.create(data);

        return res.status(200).json({
            "meta": {
                "message": "Success create a new voucher type"
            },
            "data": toObject(voucherType)
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;

        const data = new FindAllVoucherTypeDto();

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

        const voucherTypes = await voucherTypeService.findAll(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch voucher type",
                "links": {
                    "skip": skip,
                    "take": take,
                },
            },
            "data": toObject(voucherTypes) ?? null,
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const voucher = await voucherTypeService.findOne(id);

        return res.status(200).json({
            "meta": {
                "message": "Success get voucher type"
            },
            "data": toObject(voucher)
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description } = req.body;

        const data = new UpdateVoucherTypeDto();

        data.name = name;
        data.description = description;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update voucher type"
                },
                "data": errors
            });
        }

        const voucher = await voucherTypeService.update(id, data);

        return res.status(200).json({
            "meta": {
                "message": "Success update voucher type"
            },
            "data": toObject(voucher)
        });
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;

        const voucher = await voucherTypeService.delete(id);

        return res.status(200).json({
            "meta": {
                "message": "Success delete a voucher type"
            },
            "data": toObject(voucher)
        });
    }
}

export default new VoucherTypeController();