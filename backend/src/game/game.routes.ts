import gameController from "./game.controller";

const express = require("express");
const router = express.Router();

router.get("", gameController.findAll);
router.get("/latest", gameController.findLatest);
router.post("/", gameController.create);
router.get("/:id", gameController.findOne);
router.put("/:id", gameController.update);
router.delete("/:id", gameController.remove);
router.get("/game-category/:gameCategoryId", gameController.findByGameCategory);

module.exports = router;
