import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsInt } from "class-validator";

export class UpdateSpecialOfferDto implements Prisma.SpecialOfferUpdateInput {
    @Expose()
    name: string

    @Expose()
    description: string

    @Expose()
    isActive: boolean
}