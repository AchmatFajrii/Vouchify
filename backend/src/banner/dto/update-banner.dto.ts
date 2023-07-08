import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty, MinLength } from "class-validator";

export class UpdateBannerDto implements Prisma.BannerUpdateInput {
    @Expose()
    @MinLength(5, { message: "Minimal 5 characters." })
    name: string;

    @Expose()
    cloudinaryPublicId: string
    
    @Expose()
    @IsNotEmpty({message: "Please add a image of game category"})
    image: string;

    @Expose()
    @IsNotEmpty({message: "Please select status"})
    isActive?: boolean | Prisma.BoolFieldUpdateOperationsInput | undefined;

    @Expose()
    updatedAt?: Date = new Date();
}
