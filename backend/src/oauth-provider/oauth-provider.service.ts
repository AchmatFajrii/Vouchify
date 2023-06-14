import { PrismaClient } from "@prisma/client";
import { CreateOAuthProviderDto } from "./dto/create-oauth-provider.dto";
import { UpdateOAuthProviderDto } from "./dto/update-oauth-provider.dto";
import { findAllOAuthProvderDto } from "./dto/find-all-oauth-provider.dto";

const prisma = new PrismaClient();

export class OAuthProviderService {
    async create(data: CreateOAuthProviderDto) {
        return await prisma.oAuthProvider.create({
            data: {
                name: data.name,
                description: data.description,
            }
        });
    }

    async findAll(data: findAllOAuthProvderDto) {
        return await prisma.oAuthProvider.findMany({
            skip: data.skip * data.take,
            take: data.take
        });
    }

    async findOne(id: string) {
        return await prisma.oAuthProvider.findUnique({
            where: { id }
        })
    }

    async update(id: string, data: UpdateOAuthProviderDto) {
        return await prisma.oAuthProvider.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        return await prisma.oAuthProvider.delete({
            where: { id }
        })
    }
}