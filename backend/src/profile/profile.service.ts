import { PrismaClient } from "@prisma/client";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordProfileDto } from "./dto/change-password-profile.dto";
import bcrypt from 'bcrypt';
import { NewPasswordProfileDto } from "./dto/new-password-profile.dto";

const prisma = new PrismaClient();

export class ProfileService {
    async findOne(id: string) {
        return await prisma.user.findFirst({
            where: { id },
        })
    }

    async update(id: string, data: UpdateProfileDto) {
        return await prisma.user.update({
            where: {
                id
            },
            data
        })
    }

    async changePassword(id: string, data: ChangePasswordProfileDto) {
        const password = bcrypt.hashSync(data.newPassword, 12);

        return await prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
    }

    async newPassword(id: string, data: NewPasswordProfileDto) {
        const password = bcrypt.hashSync(data.newPassword, 12);

        return await prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        })
    }
}