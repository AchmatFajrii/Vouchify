import gameCategoryController from "./game-category.controller";

const express = require("express");

const router = express.Router();

router.get("/", gameCategoryController.findAll);
router.post("", gameCategoryController.create);
router.put("/:id", gameCategoryController.update);
router.get("/:id", gameCategoryController.findOne);
router.delete("/:id", gameCategoryController.remove);

module.exports = router;
