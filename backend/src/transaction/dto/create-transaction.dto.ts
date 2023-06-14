import { Prisma, TransactionStatus } from "@prisma/client";
import { Expose } from "class-transformer";

export class CreateTransactionDto implements Prisma.TransactionCreateInput {
    @Expose()
    transactionNumber: string

    @Expose()
    price: number | bigint;

    @Expose()
    discount: number | bigint;

    @Expose()
    userId: string

    @Expose()
    voucherId: string

    @Expose()
    user: Prisma.UserCreateNestedOneWithoutTransactionInput;

    @Expose()
    voucher: Prisma.VoucherCreateNestedOneWithoutTransactionsInput;

    @Expose()
    transactionHistories?: Prisma.TransactionHistoryCreateNestedManyWithoutTransactionInput | undefined;
}