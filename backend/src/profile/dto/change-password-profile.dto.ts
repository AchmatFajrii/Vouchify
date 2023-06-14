import { Gender, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";

export class ChangePasswordProfileDto {
    @Expose()
    oldPassword: string

    @Expose()
    newPassword: string

    @Expose()
    confirmationPassword: string
}