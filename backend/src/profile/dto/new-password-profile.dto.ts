import { Gender, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";

export class NewPasswordProfileDto {
    @Expose()
    newPassword: string

    @Expose()
    confirmationPassword: string
}