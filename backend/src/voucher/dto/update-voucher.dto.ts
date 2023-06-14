import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class UpdateVoucherDto implements Prisma.VoucherUpdateInput {
    @Expose()
    name: string

    @Expose()
    @IsInt({ message: "Please insert special offer price" })
    price: number | bigint

    @Expose()
    gameId: string

    @Expose()
    voucherTypeId: string
}