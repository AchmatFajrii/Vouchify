import { PrismaClient } from "@prisma/client";
import { CreateBannerDto } from "./dto/create-banner.dto";
import { FindAllBannerDto } from "./dto/find-all-banner.dto";
import { UpdateBannerDto } from "./dto/update-banner.dto";

const prisma = new PrismaClient();

export class BannerService {
    async create(data: CreateBannerDto) {
        return await prisma.banner.create({ data })
    }

    async findAll(data: FindAllBannerDto) {
        return await prisma.banner.findMany({
          skip: data.skip * data.take,
          take: data.take
        });
    }

    async findActiveBanner() {
        return await prisma.banner.findMany({
            where: {
                isActive: true
            }
        });
    }

    async findOne(id: string) {
      return await prisma.banner.findFirst({ where: { id } })
    }
  
    async update(id: string, data: UpdateBannerDto) {
      return await prisma.banner.update({ where: { id }, data })
    }
  
    async remove(id: string) {
      return await prisma.banner.delete({ where: { id } })
    }
}