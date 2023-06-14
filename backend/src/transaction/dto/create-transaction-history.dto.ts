import { Prisma, TransactionStatus } from "@prisma/client";
import { Expose } from "class-transformer";

export class CreateTransactionHistoryDto implements Prisma.TransactionHistoryCreateInput {
    @Expose()
    title: string;

    @Expose()
    description?: string | null | undefined;

    @Expose()
    transactionId: string;

    @Expose()
    transaction: Prisma.TransactionCreateNestedOneWithoutTransactionHistoriesInput;
}