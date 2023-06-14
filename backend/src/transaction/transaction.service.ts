import { PrismaClient } from "@prisma/client";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { FindAllTransactionByUserDto } from "./dto/find-all-transaction-by-user.dto";
import { TrackingTransactionDto } from "./dto/tracking-transaction.dto";
import { ConfirmationTransactionDto } from "./dto/confirmation-transaction.dto";
import { CreateTransactionHistoryDto } from "./dto/create-transaction-history.dto";

const prisma = new PrismaClient();

export class TransactionService {
    async create(data: CreateTransactionDto) {
        return await prisma.transaction.create({
            data: {
                transactionNumber: data.transactionNumber,
                price: data.price,
                discount: data.discount,
                user: {
                    connect: { id: data.userId }
                },
                voucher: {
                    connect: { id: data.voucherId }
                }
            }
        })
    }

    async createTransactionHistory(data: CreateTransactionHistoryDto) {
        return await prisma.transactionHistory.create({
            data: {
                title: data.title,
                description: data.description,
                transaction: {
                    connect: { id: data.transactionId }
                }
            }
        })
    }

    async update(id: string, data: UpdateTransactionDto) {
        return await prisma.transaction.update({
            where: {
                id
            },
            data
        })
    }

    async confirmation(id: string, data: ConfirmationTransactionDto) {
        return await prisma.transaction.update({
            where: {
                id
            },
            data
        })
    }

    async findOne(id: string) {
        return await prisma.transaction.findUnique({
            where: {
                id
            },
            include: {
                voucher: true,
            }
        });
    }

    async findGameByGameId(id: string) {
        return await prisma.game.findUnique({
            where: {
                id
            }
        })
    }

    async findTransactionByUserId(userId: string, data: FindAllTransactionByUserDto) {
        return await prisma.transaction.findMany({
            skip: data.skip * data.take,
            take: data.take,
            where: {
                userId
            }
        })
    }

    async findByTransactionNumber(data: TrackingTransactionDto) {
        return await prisma.transaction.findFirst({
            where: {
                transactionNumber: data.transactionNumber
            }
        })
    }

    async findUserById(id: string) {
        return await prisma.user.findFirst({
            where: {
                id
            }
        });
    }

    async findVoucherById(id: string) {
        return await prisma.voucher.findFirst({
            where: {
                id
            }
        });
    }

    async findDiscountById(id: string) {
        return await prisma.discount.findFirst({
            where: {
                id
            }
        })
    }
}