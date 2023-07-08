import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateSpecialOfferDto implements Prisma.SpecialOfferCreateInput {
    @Expose()
    @IsNotEmpty({ message: "Please insert special offer name" })
    name: string

    @Expose()
    @IsNotEmpty({ message: "Please insert special offer description" })
    description: string

    @Expose()
    @IsNotEmpty({ message: "Please insert special offer status" })
    isActive: boolean
}