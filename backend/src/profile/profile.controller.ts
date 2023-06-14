import { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { plainToClass } from "class-transformer";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordProfileDto } from "./dto/change-password-profile.dto";
import { validate } from 'class-validator';
import bcrypt from 'bcrypt';

const profileService = new ProfileService();

class ProfileController {
    async update(req: any, res: Response) {
        const { userId } = req.payload;
        const { name, gender, phoneNumber } = req.body;

        const profileBody = {
            "name": name,
            "gender": gender,
            "phoneNumber": phoneNumber,
        };
        const data = plainToClass(UpdateProfileDto, profileBody);

        const profile = await profileService.update(userId, data);

        return res.status(200).json({
            "meta": {
                "message": "Success update profile"
            },
            "data": profile
        });
    }

    async changePassword(req: any, res: Response) {
        const { userId } = req.payload;
        const { oldPassword, newPassword, confirmationPassword } = req.body;

        if (newPassword != confirmationPassword) {
            return res.status(400).json({
                "meta": {
                    "message": "Your password not same"
                },
                "data": null
            });
        }

        const user = await profileService.findOne(userId);
        const validPassword = await bcrypt.compare(oldPassword, user?.password || '');
        if (!validPassword) {
            return res.status(400).json({
                "meta": {
                    "message": "Please check your password"
                },
                "data": null
            });
        }

        const data = new ChangePasswordProfileDto();

        data.oldPassword = oldPassword;
        data.newPassword = newPassword;
        data.confirmationPassword = confirmationPassword;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update game"
                },
                "data": errors
            });
        }

        const profile = await profileService.changePassword(userId, data);

        return res.status(200).json({
            "meta": {
                "message": "Success change password"
            },
            "data": profile
        });
    }

    async newPassword(req: any, res: Response) {
        const { userId } = req.payload;
        const { newPassword, confirmationPassword } = req.body;

        if (newPassword != confirmationPassword) {
            return res.status(400).json({
                "meta": {
                    "message": "Your password not same"
                },
                "data": null
            });
        }

        const data = new ChangePasswordProfileDto();

        data.newPassword = newPassword;
        data.confirmationPassword = confirmationPassword;

        const errors = await validate(data);
        if (errors.length > 0) {
            return res.status(400).json({
                "meta": {
                    "message": "Failed update game"
                },
                "data": errors
            });
        }

        const profile = await profileService.newPassword(userId, data);

        return res.status(200).json({
            "meta": {
                "message": "Success create new password"
            },
            "data": profile
        });
    }

    async myProfile(req: any, res: Response) {
        const { userId } = req.payload;
        const user = await profileService.findOne(userId);

        return res.status(200).json({
            "meta": {
                "message": "Success get profile"
            },
            "data": user
        });
    }
}

export default new ProfileController();