import { Request, Response } from "express";
import { CreateOAuthProviderDto } from "./dto/create-oauth-provider.dto";
import { validate } from "class-validator";
import { OAuthProviderService } from "./oauth-provider.service";
import { toObject } from "../utils/provider/convert.provider";
import { findAllOAuthProvderDto } from "./dto/find-all-oauth-provider.dto";
import { UpdateOAuthProviderDto } from "./dto/update-oauth-provider.dto";

const oAuthProviderService = new OAuthProviderService();

class OAuthProviderController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body;

        const data = new CreateOAuthProviderDto();

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

        const oAuthProvider = await oAuthProviderService.create(data);

        return res.status(200).json({
            "meta": {
                "message": "Success create a new oauth provider"
            },
            "data": toObject(oAuthProvider)
        });
    }

    async findAll(req: Request, res: Response) {
        const { skip, take } = req.query;

        const data = new findAllOAuthProvderDto();

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

        const oAuthProviders = await oAuthProviderService.findAll(data);

        return res.status(200).json({
            "meta": {
                "message": "Success fetch oauth provider",
                "links": {
                    "skip": skip,
                    "take": take,
                },
            },
            "data": toObject(oAuthProviders) ?? null,
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const voucher = await oAuthProviderService.findOne(id);

        return res.status(200).json({
            "meta": {
                "message": "Success get oauth provider"
            },
            "data": toObject(voucher)
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description } = req.body;

        const data = new UpdateOAuthProviderDto();

        data.name = name;
        data.description = description;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update oauth provider"
                },
                "data": errors
            });
        }

        const oAuthProvider = await oAuthProviderService.update(id, data);

        return res.status(200).json({
            "meta": {
                "message": "Success update oauth provider"
            },
            "data": toObject(oAuthProvider)
        });
    }

    async remove(req: Request, res: Response) {
        const { id } = req.params;

        const oAuthProvider = await oAuthProviderService.delete(id);

        return res.status(200).json({
            "meta": {
                "message": "Success delete a oauth provider"
            },
            "data": toObject(oAuthProvider)
        });
    }
}

export default new OAuthProviderController();