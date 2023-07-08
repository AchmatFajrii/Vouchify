import { PrismaClient } from "@prisma/client";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { FindAllGameDto } from "./dto/find-all-game.dto";
import { FindAllGameCategoryDto } from "../game-category/dto/find-all-game-category.dto";

const prisma = new PrismaClient();

export class GameService {
  async create(data: CreateGameDto) {
    return await prisma.game.create({
      data: {
        name: data.name,
        description: data.description,
        cloudinaryPublicId: data.cloudinaryPublicId,
        image: data.image,
        gameCategory: {
          connect: { id: data.gameCategoryId }
        }
      }
    });
  }

  async findAll(data: FindAllGameDto) {
    return await prisma.game.findMany({
      skip: data.skip * data.take,
      take: data.take,
      include: {
        gameCategory: true
      }
    });
  }

  async findLatest() {
    return await prisma.game.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await prisma.game.findFirst({
      where: { 
        id: id,
       },
      include: { 
        gameCategory: true,
       }
    })
  }

  async findVoucherTypeById(id: string) {
    return await prisma.voucherType.findFirst({
      where: { id },
    })
  }

  async findByGameCategoryId(id: string, data: FindAllGameCategoryDto) {
    return await prisma.game.findMany({
      where: {
        gameCategoryId: id
      },
      skip: data.skip * data.take,
      take: data.take
    })
  }

  async update(id: string, data: UpdateGameDto) {
    return await prisma.game.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: string) {
    return await prisma.game.delete({ where: { id } });
  }
}
