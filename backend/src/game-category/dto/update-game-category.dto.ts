import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateGameCategoryDto implements Prisma.GameCategoryUpdateInput {
    @Expose()
    @MinLength(5, { message: "Minimal 5 characters." })
    name: string;

    @Expose()
    updatedAt?: Date = new Date();
}
