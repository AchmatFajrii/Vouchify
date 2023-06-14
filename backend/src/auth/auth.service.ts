import { PrismaClient } from "@prisma/client";

const bcrypt = require('bcrypt');
const { hashToken } = require("../utils/jwt/hash-token.jwt");

const prisma = new PrismaClient();

export class AuthService {
    // used when we create a refresh token.
    async addRefreshTokenToWhitelist({ jti, refreshToken, userId }: any) {
        return prisma.refreshToken.create({
            data: {
                id: jti,
                hashedToken: hashToken(refreshToken),
                userId
            },
        });
    }


    // used to check if the token sent by the client is in the database.
    async findRefreshTokenById(id: string) {
        return prisma.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }

    // soft delete tokens after usage.
    async deleteRefreshToken(id: string) {
        return prisma.refreshToken.update({
            where: {
                id,
            },
            data: {
                revoked: true
            }
        });
    }

    async revokeTokens(userId: string) {
        return prisma.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        });
    }


    async findUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findUserById(id: string) {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }


    async createUserByEmailAndPassword(user: any) {
        user.password = bcrypt.hashSync(user.password, 12);

        return prisma.user.create({
            data: user,
        });
    }
    
    async createOAuthUser(oAuthUser: any) {
return prisma.oAuthUser.create({
    data:oAuthUser
});
    }

    async createUserByEmail(user: any) {
        return prisma.user.create({
            data: user,
        });
    }

    async findOAuthProviderByName(name: string) {
        return prisma.oAuthProvider.findFirst({
            where: {
                name
            }
        })
    }

}