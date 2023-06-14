import { Prisma } from "@prisma/client";
import { Expose } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateOAuthProviderDto implements Prisma.OAuthProviderCreateInput {
    @Expose()
    @IsNotEmpty()
    @MaxLength(15, { message: "Nax length is 15 characters" })
    name: string;

    @Expose()
    @IsNotEmpty()
    description: string;

    OAuthUser?: Prisma.OAuthUserCreateNestedManyWithoutOAuthProviderInput | undefined;
}