import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class FindAllBannerDto {
    @Expose()
    @IsNotEmpty({ message: "Please insert skip data" })
    @IsInt({ message: "Please insert number" })
    skip: number

    @Expose()
    @IsNotEmpty({ message: "Please insert take data" })
    @IsInt({ message: "Please insert number" })
    take: number

}