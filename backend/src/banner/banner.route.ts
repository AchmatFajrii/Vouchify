import bannerController from "./banner.controller";

const express = require("express");

const router = express.Router();

router.get("", bannerController.findAll);
router.get("/active-banners", bannerController.activeBanners);
router.post("/", bannerController.create);
router.get("/:id", bannerController.findOne);
router.put("/:id", bannerController.update);
router.delete("/:id", bannerController.remove);

module.exports = router;
