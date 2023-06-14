import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class TrackingTransactionDto {
    @Expose()
    @IsNotEmpty({ message: "Please insert skip data" })
    transactionNumber: string
}