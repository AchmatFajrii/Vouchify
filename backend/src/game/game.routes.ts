import gameController from "./game.controller";

const express = require("express");

const router = express.Router();

// dependency multer
// const multer = require("multer");
// const fileUpload = multer()

router.get("", gameController.findAll);
// router.post("/", fileUpload.single('image'), gameController.create);
router.post("/", gameController.create);
router.get("/:id", gameController.findOne);
router.put("/:id", gameController.update);
router.delete("/:id", gameController.remove);
router.get("/game-category/:gameCategoryId", gameController.findByGameCategory);

module.exports = router;
