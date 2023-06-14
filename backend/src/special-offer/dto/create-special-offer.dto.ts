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
    @IsNotEmpty()
    @IsInt({ message: "Please insert special offer price" })
    price: number | bigint

    @Expose()
    @IsNotEmpty({ message: "Please insert special offer from" })
    from: Date

    @Expose()
    @IsNotEmpty({ message: "Please insert special offer to" })
    to: Date

    @Expose()
    @IsNotEmpty({ message: "Please insert voucher id" })
    voucherId: string

    voucher: Prisma.VoucherCreateNestedOneWithoutSpecialOffersInput;
}