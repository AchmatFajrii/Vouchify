import { validate } from "class-validator";
import { DiscountService } from "./discount.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Request, Response } from "express";
import { toObject } from "../utils/provider/convert.provider";
import { FindAllDiscountDto } from "./dto/find-all-discount.dto";

const discountService = new DiscountService();

class DiscountController {
    async create(req: Request, res: Response,) {
        var discout, message;
        const { voucherId } = req.body;

        const voucher = await discountService.findVoucherById(voucherId);
        if (voucher) {
            const data = new CreateDiscountDto();
            const { code, from, to, value, type } = req.body;

            data.code = code;
            data.from = new Date(from);
            data.to = new Date(to);
            data.value = value;
            data.type = type;
            data.voucherId = voucherId;

            const errors = await validate(data);
            if (errors.length > 0) {
                return res.status(400).json({ errors });;
            }

            discout = await discountService.create(data);

            message = "Success create a new discount item";
        } else {
            message = 'Voucher not found';
        }


        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": toObject(discout) ?? null
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;

        const data = new FindAllDiscountDto();

        // Pagination
        data.skip = parseInt(skip as string);
        data.take = parseInt(take as string);

        // Validation query parameter
        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed fetch discount"
                },
                "data": errors
            });;
        }

        const discounts = await discountService.findAll(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch discounts",
                "links": {
                    "skip": skip,
                    "take": take,
                },
            },
            "data": toObject(discounts) ?? null
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;

        const discount = await discountService.findOne(id);

        return res.status(200).json({
            "meta": {
                "message": "Success get a discount"
            },
            "data": toObject(discount) ?? null
        });
    }

    async update(req: Request, res: Response) {
        var discount, message;
        const { id } = req.params;
        const { voucherId } = req.body;

        if (voucherId) {
            const voucher = await discountService.findVoucherById(voucherId);
            if (voucher) {
                const data = new UpdateDiscountDto();
                const { from, to, value, type } = req.body;

                data.from = new Date(from);
                data.to = new Date(to);
                data.value = value;
                data.type = type;
                data.voucherId = voucherId;

                const errors = await validate(data);
                if (errors.length > 0) {
                    return res.status(400).json({ errors });;
                }

                discount = await discountService.update(id, data);

                message = "Success update a discount";
            } else {
                message = "Failed to update discount, voucher not found";
            }
        } else {
            message = "Please insert voucher id";
        }

        return res.status(200).json({
            "meta": {
                "message": message
            },
            "data": discount != null ? toObject(discount) : null
        });
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;
        const discount = await discountService.remove(id);

        return res.status(200).json({
            "meta": {
                "message": "Success delete discount"
            },
            "data": toObject(discount) ?? null
        });
    }
}

export default new DiscountController();