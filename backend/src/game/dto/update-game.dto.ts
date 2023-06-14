import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";

export class UpdateGameDto implements Prisma.GameUpdateInput {
    @Expose()
    @MaxLength(30, { message: "Max length is 30 characters" })
    name: string;

    @Expose()
    description: string;

    @Expose()
    image: string

    @Expose()
    cloudinaryPublicId: string

    @Expose()
    gameCategoryId: string

    @Expose()
    updatedAt?: Date = new Date();
}
