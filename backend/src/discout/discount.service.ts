import { PrismaClient } from "@prisma/client";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { FindAllDiscountDto } from "./dto/find-all-discount.dto";

const prisma = new PrismaClient();

export class DiscountService {
    async create(data: CreateDiscountDto) {
        return await prisma.discount.create({
            data: {
                code: data.code,
                from: data.from,
                to: data.to,
                value: data.value,
                type: data.type,
                voucher: {
                    connect: { id: data.voucherId }
                }
            }
        })
    }

    async findAll(data: FindAllDiscountDto) {
        return await prisma.discount.findMany({
            skip: data.skip * data.take,
            take: data.take,
        })
    }

    async findOne(id: string) {
        return await prisma.discount.findUnique({
            where: { id }
        })
    }

    async findByCode(code: string) {
        return await prisma.discount.findFirst({
            where: { code }
        })
    }

    async update(id: string, data: UpdateDiscountDto) {
        return await prisma.discount.update({
            where: { id },
            data: {
                from: data.from,
                to: data.to,
                value: data.value,
                type: data.type,
                voucher: {
                    connect: { id: data.voucherId }
                }
            }
        })
    }

    async remove(id: string) {
        return await prisma.discount.delete({ where: { id } });
    }

    async findVoucherById(id: string) {
        return await prisma.voucher.findUnique({
            where: {
                id
            }
        })
    }
}