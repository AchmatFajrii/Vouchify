import { Prisma, TransactionStatus } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class ConfirmationTransactionDto implements Prisma.TransactionUpdateInput {
    @Expose()
    @IsNotEmpty({ message: "Please upload image" })
    image: string

    @Expose()
    cloudinaryPublicId: string

    @Expose()
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | TransactionStatus | undefined;
}