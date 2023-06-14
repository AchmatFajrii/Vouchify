import { plainToClass } from "class-transformer";
import { CreateGameCategoryDto } from './dto/create-game-category.dto';
import { UpdateGameCategoryDto } from "./dto/update-game-category.dto";
import { GameCategoryService } from "./game-category.service";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { toObject } from "../utils/provider/convert.provider";
import { FindAllGameCategoryDto } from "./dto/find-all-game-category.dto";

const gameCategoryService = new GameCategoryService();

class GameCategoryController {
  async create(req: Request, res: Response) {
    let message;

    const data = new CreateGameCategoryDto();
    const { name } = req.body;

    data.name = name;

    const errors = await validate(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });;
    }

    const createdGameCategory = await gameCategoryService.create(data);

    message = 'Success create a new game category';

    return res.status(200).json({
      "meta": {
        "message": message
      },
      "data": toObject(createdGameCategory) ?? null
    });
  }

  async findAll(req: Request, res: Response) {
    const { skip, take } = req.query;

    const data = new FindAllGameCategoryDto();

    // Pagination
    data.skip = parseInt(skip as string);
    data.take = parseInt(take as string);

    // Validation query parameter
    const errors = await validate(data);
    if (errors.length > 0) {
      return res.status(400).json({
        "meta": {
          "message": "Failed fetch game category"
        },
        "data": errors
      });;
    }

    const gameCategories = await gameCategoryService.findAll(data);

    return res.status(200).json({
      "meta": {
        "message": "Success fetch game category",
        "links": {
          "skip": skip,
          "take": take,
        },
      },
      "data": toObject(gameCategories) ?? null,
    });
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const gameCategory = await gameCategoryService.findOne(id);

    return res.status(200).json({
      "meta": {
        "message": "Success get game category"
      },
      "data": toObject(gameCategory) ?? null
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const gameCategoryBody = req.body;

    const data = plainToClass(UpdateGameCategoryDto, gameCategoryBody);

    const gameCategory = await gameCategoryService.update(id, data);

    return res.status(200).json({
      "meta": {
        "message": "Success update game category"
      },
      "data": toObject(gameCategory) ?? null
    });
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const gameCategory = await gameCategoryService.remove(id);

    return res.status(200).json({
      "meta": {
        "message": "Success delete game category"
      },
      "data": toObject(gameCategory) ?? null
    });
  }
}

export default new GameCategoryController();
