import { Prisma, TransactionStatus } from "@prisma/client";
import { Expose } from "class-transformer";

export class UpdateTransactionDto implements Prisma.TransactionUpdateInput {
    @Expose()
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | TransactionStatus | undefined;
}