import { PrismaClient } from "@prisma/client";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { UpdateVoucherDto } from "./dto/update-voucher.dto";
import { FindAllVoucherDto } from "./dto/find-all-voucher.dto";

const prisma = new PrismaClient();

export class VoucherService {
    async create(data: CreateVoucherDto) {
        return await prisma.voucher.create({
            data: {
                name: data.name,
                price: data.price,
                game: {
                    connect: { id: data.gameId }
                },
                voucherType: {
                    connect: { id: data.voucherTypeId }
                }
            }
        })
    }

    async findAll(data: FindAllVoucherDto) {
        return await prisma.voucher.findMany({
            skip: data.skip * data.take,
            take: data.take
        })
    }

    async findOne(id: string) {
        return await prisma.voucher.findUnique({
            where: {
                id
            }
        })
    }

    async findVoucherTypeById(id: string) {
        return await prisma.voucherType.findFirst({
            where: { id }
        })
    }

    async update(id: string, data: UpdateVoucherDto) {
        return await prisma.voucher.update({
            where: { id },
            data
        })
    }

    async remove(id: string) {
        return await prisma.voucher.delete({ where: { id } });
    }
}