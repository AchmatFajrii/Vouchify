import { DiscountType, GameCategory, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, MaxLength, } from "class-validator";

export class CreateVoucherDto implements Prisma.VoucherCreateInput {
    @Expose()
    @IsNotEmpty()
    @MaxLength(30, { message: "Nax length is 30 characters" })
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsInt({ message: "Please insert price of voucher" })
    price: bigint;

    @Expose()
    @IsNotEmpty({ message: "Please insert game id" })
    gameId: string;

    @Expose()
    @IsNotEmpty({ message: "Please insert voucher type id" })
    voucherTypeId: string

    @Expose()
    game: Prisma.GameCreateNestedOneWithoutVouchersInput;

    @Expose()
    voucherType: Prisma.VoucherTypeCreateNestedOneWithoutVouchersInput;
}
