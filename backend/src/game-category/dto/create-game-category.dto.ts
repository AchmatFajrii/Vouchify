import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateGameCategoryDto implements Prisma.GameCategoryCreateInput {
  @Expose()
  @IsNotEmpty()
  @MinLength(5, { message: "Minimal 5 characters." })
  name: string;
}
