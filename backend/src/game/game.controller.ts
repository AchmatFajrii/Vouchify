import { GameCategoryService } from "../game-category/game-category.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { GameService } from "./game.service";
import { Request, Response } from "express";
import { FolderLocation, removeImageProvider, uploadImageProvider } from "../utils/provider/image-upload.provider";
import { validate } from "class-validator";
import { toObject } from "../utils/provider/convert.provider";
import { FindGameByGameCategory } from "./dto/find-game-by-game-category.dto";
import { FindAllGameCategoryDto } from "../game-category/dto/find-all-game-category.dto";

const gameService = new GameService();
const gameCategoryService = new GameCategoryService;

class GameController {
  async create(req: Request, res: Response) {
    let message;
    var game;
    const { gameCategoryId } = req.body;

    // find game category to validate
    const gameCategory = await gameCategoryService.findOne(gameCategoryId);

    // Check if game category exist
    if (gameCategory) {
      const { image } = req.body;
      if (image) {
        const file = "data:image/png;base64," + image;
        const data = new CreateGameDto();
        const { name, description } = req.body;

        data.name = name;
        data.gameCategoryId = gameCategoryId;
        data.description = description;

        // Upload image to cloudinary
        await uploadImageProvider(file, FolderLocation.Game).then(value => {
          console.log(value);
          if (value.status == 'success') {
            data.cloudinaryPublicId = value.publicId;
            data.image = value.url;

            message = 'Success created a new game';
          } else {
            message = 'Failed while upload image';
          }
        });

        const errors = await validate(data);
        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        game = await gameService.create(data);
      } else {
        message = 'Please insert an image';
      }
    } else {
      message = 'Game category not found';
    }

    return res.status(200).json({
      "meta": {
        "message": message
      },
      "data": toObject(game) ?? null
    });
  }

  async findAll(req: Request, res: Response) {
    let status, message;
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

    const games = await gameService.findAll(data);

    return res.status(200).json({
      "meta": {
        "message": "Success fetch data",
        "links": {
          "skip": skip,
          "take": take,
        },
      },
      "data": toObject(games) ?? null,
    });
  }

  async findLatest(req: Request, res: Response) {
    const games = await gameService.findLatest();

    return res.status(200).json({
      "meta": {
        "message": "Success fetch data!",
      },
      "data": toObject(games) ?? null,
    });
  }

  async findByGameCategory(req: Request, res: Response) {
    const { skip, take } = req.query;

    const data = new FindGameByGameCategory();

    // Pagination
    data.skip = parseInt(skip as string);
    data.take = parseInt(take as string);

    // Validation query parameter
    const errors = await validate(data);
    if (errors.length > 0) {
      return res.status(400).json({
        "meta": {
          "message": "Failed fetch game by category"
        },
        "data": errors
      });;
    }

    const { gameCategoryId } = req.params;
    const games = await gameService.findByGameCategoryId(gameCategoryId, data);

    return res.status(200).json({
      "meta": {
        "message": "Success fetch game by category",
        "links": {
          "skip": skip,
          "take": take,
        },
      },
      "data": toObject(games) ?? null
    });
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const game = await gameService.findOne(id);

    return res.status(200).json({
      "meta": {
        "message": "Success get a game"
      },
      "data": toObject(game)
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { gameCategoryId } = req.body;
    var game, message;

    // find game category to validate
    const gameCategory = await gameCategoryService.findOne(gameCategoryId);

    if (gameCategory) {
      const data = new UpdateGameDto();
      const { name, description, image } = req.body;

      if (image != null) {
        const file = "data:image/png;base64," + image;
        const currentGame = await gameService.findOne(id);

        data.name = name;
        data.description = description;
        data.gameCategoryId = gameCategoryId;

        await uploadImageProvider(file, FolderLocation.Game).then(value => {
          if (value.status == 'success') {
            data.cloudinaryPublicId = value.publicId;
            data.image = value.url;

            message = 'Success updated a game';
          } else {
            message = 'Please insert an image';
          }
        });

        const errors = await validate(data);
        if (errors.length > 0) {
          return res.status(400).json({
            "meta": {
              "message": "Failed update game"
            },
            "game": errors
          });
        }

        game = await gameService.update(id, data);

        if (game) {
          removeImageProvider(currentGame?.cloudinaryPublicId);
        }
      } else {
        const { name, description } = req.body;

        data.name = name;
        data.description = description;

        const errors = await validate(data);
        if (errors.length > 0) {
          return res.status(400).json({
            "meta": {
              "message": "Failed update game"
            },
            "game": errors
          });
        }

        game = await gameService.update(id, data);
      }
    } else {
      message = 'Game category not found';
    }

    return res.status(200).json({
      "meta": {
        "message": message
      },
      "data": game != undefined
        ? toObject(game)
        : null
    });
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    const game = await gameService.findOne(id);

    if (game?.cloudinaryPublicId != null) {
      removeImageProvider(game?.cloudinaryPublicId);
    }

    gameService.remove(id);

    return res.status(200).json({
      "meta": {
        "message": "Success delete a game"
      },
      "data": toObject(game) ?? null
    });
  }
}

export default new GameController();
