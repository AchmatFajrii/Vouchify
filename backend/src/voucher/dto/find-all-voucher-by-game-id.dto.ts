import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class FindAllVoucherByGameIdDto {
    @Expose()
    @IsString({ message: "Game id must be string" })
    @IsNotEmpty({ message: "Please insert game id" })
    gameId: string
}