import { PrismaClient } from "@prisma/client";
import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { FindAllSpecialOfferDto } from "./dto/find-all-special-offer.dto";

const prisma = new PrismaClient();

export class SpecialOfferService {
    async create(data: CreateSpecialOfferDto) {
        return await prisma.specialOffer.create({
            data: {
                name: data.name,
                description: data.description,
                isActive: data.isActive,
            }
        })
    }

    async findAll(data: FindAllSpecialOfferDto) {
        return await prisma.specialOffer.findMany({
            skip: data.skip * data.take,
            take: data.take,
        });
    }

    async findActiveSpecialOffer() {
        return await prisma.specialOffer.findMany({
            where: {
                isActive: true
            }
        });
    }

    async findOne(id: string) {
        return await prisma.specialOffer.findFirst({ where: { id } })
    }

    async findVoucherById(id: string) {
        return await prisma.voucher.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: string, data: UpdateSpecialOfferDto) {
        return await prisma.specialOffer.update({ where: { id }, data })
    }

    async remove(id: string) {
        return await prisma.specialOffer.delete({ where: { id } })
    }
}