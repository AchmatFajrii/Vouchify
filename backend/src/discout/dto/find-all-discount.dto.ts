import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class FindAllDiscountDto {
    @Expose()
    @IsInt({ message: "Skip data must be int" })
    @IsNotEmpty({ message: "Please insert skip data" })
    skip: number

    @Expose()
    @IsInt({ message: "Take data must be int" })
    @IsNotEmpty({ message: "Please insert take data" })
    take: number
}