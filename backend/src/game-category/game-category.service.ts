import { PrismaClient } from "@prisma/client";
import { CreateGameCategoryDto } from "./dto/create-game-category.dto";
import { UpdateGameCategoryDto } from "./dto/update-game-category.dto";
import { FindAllGameCategoryDto } from "./dto/find-all-game-category.dto";

const prisma = new PrismaClient();

export class GameCategoryService {
  async create(data: CreateGameCategoryDto) {
    return await prisma.gameCategory.create({ data });
  }

  async findAll(data: FindAllGameCategoryDto) {
    return await prisma.gameCategory.findMany({
      skip: data.skip * data.take,
      take: data.take
    });
  }

  async findOne(id: string) {
    return await prisma.gameCategory.findFirst({ where: { id } })
  }

  async findGameByCategory(id: string) {
    return await prisma.game.findMany({ where: { gameCategoryId: id } })
  }

  async update(id: string, data: UpdateGameCategoryDto) {
    return await prisma.gameCategory.update({ where: { id }, data })
  }

  async remove(id: string) {
    return await prisma.gameCategory.delete({ where: { id } })
  }
}
