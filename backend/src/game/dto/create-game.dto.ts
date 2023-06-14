import { GameCategory, Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty, MaxLength, max } from "class-validator";

export class CreateGameDto implements Prisma.GameCreateInput {
  @Expose()
  @IsNotEmpty({ message: "Please insert name" })
  @MaxLength(30, { message: "Nax length is 15 characters" })
  name: string;

  @Expose()
  @IsNotEmpty({ message: "Please insert description" })
  description: string;

  @Expose()
  @IsNotEmpty({ message: "Please upload image" })
  image: string

  @Expose()
  cloudinaryPublicId: string

  @Expose()
  @IsNotEmpty({ message: "Please select game category" })
  gameCategoryId: string

  @Expose()
  gameCategory: Prisma.GameCategoryCreateNestedOneWithoutGamesInput;
}
