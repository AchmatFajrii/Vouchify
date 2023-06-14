import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateVoucherTypeDto implements Prisma.VoucherTypeCreateInput {
    @Expose()
    @IsNotEmpty()
    name: string;

    @Expose()
    description?: string | null | undefined;

    vouchers?: Prisma.VoucherCreateNestedManyWithoutVoucherTypeInput | undefined;
}