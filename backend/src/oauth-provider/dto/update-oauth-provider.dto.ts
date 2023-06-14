import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { MaxLength } from "class-validator";

export class UpdateOAuthProviderDto implements Prisma.OAuthProviderUpdateInput {
    @Expose()
    @MaxLength(30, { message: "Max length is 30 characters" })
    name: string;

    @Expose()
    description: string;
}