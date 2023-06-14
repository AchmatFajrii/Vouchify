import { DiscountType, GameCategory, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, MaxLength, } from "class-validator";

export class CreateDiscountDto implements Prisma.DiscountCreateInput {
    @Expose()
    @IsNotEmpty()
    @MaxLength(15, { message: "Nax length is 15 characters" })
    code: string;

    @Expose()
    @IsNotEmpty({ message: "Please insert voucher id" })
    voucherId: string;

    @Expose()
    @IsNotEmpty({ message: "Please insert discount expired start" })
    from: Date;

    @Expose()
    @IsNotEmpty({ message: "Please insert discount expired end" })
    to: Date;

    @Expose()
    @IsNotEmpty({ message: "Please insert discount value" })
    @IsInt({ message: "Please insert number" })
    value: bigint

    @Expose()
    type?: DiscountType | undefined;

    voucher: Prisma.VoucherCreateNestedOneWithoutDiscountsInput;
}
