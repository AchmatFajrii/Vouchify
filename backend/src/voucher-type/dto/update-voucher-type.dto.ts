import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { MaxLength } from "class-validator";

export class UpdateVoucherTypeDto implements Prisma.VoucherTypeUpdateInput {
    @Expose()
    @MaxLength(15, { message: "Nax length is 15 characters" })
    name: string;

    @Expose()
    @MaxLength(15, { message: "Nax length is 15 characters" })
    description: string;

    @Expose()
    updatedAt?: Date = new Date();
}