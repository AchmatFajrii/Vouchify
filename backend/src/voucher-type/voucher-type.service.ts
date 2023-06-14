import { PrismaClient } from "@prisma/client";
import { CreateVoucherTypeDto } from "./dto/create-voucher-type.dto";
import { UpdateVoucherTypeDto } from "./dto/update-voucher-type.dto";
import { FindAllVoucherTypeDto } from "./dto/find-all-voucher-type.dto";

const prisma = new PrismaClient();

export class VoucherTypeService {
    async create(data: CreateVoucherTypeDto) {
        return await prisma.voucherType.create({
            data
        });
    }

    async findAll(data: FindAllVoucherTypeDto) {
        return await prisma.voucherType.findMany({
            skip: data.skip * data.take,
            take: data.take
        });
    }

    async findOne(id: string) {
        return await prisma.voucherType.findUnique({ where: { id } });
    }

    async update(id: string, data: UpdateVoucherTypeDto) {
        return await prisma.voucherType.update({
            where: { id },
            data
        });
    }

    async delete(id: string) {
        return await prisma.voucherType.delete({ where: { id } });
    }
}