import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsInt } from "class-validator";

export class UpdateSpecialOfferDto implements Prisma.SpecialOfferUpdateInput {
    @Expose()
    name: string

    @Expose()
    description: string

    @Expose()
    @IsInt({ message: "Please insert special offer price" })
    price: number | bigint

    @Expose()
    from: Date

    @Expose()
    to: Date

    @Expose()
    voucherId: string
}