import voucherController from "./voucher.controller";

const express = require("express")
const router = express.Router();

router.get("/", voucherController.findAll);
router.get("/by-game-id/:gameId", voucherController.findAllByGameId);
router.get("/:id", voucherController.findOne);
router.post("/", voucherController.create);
router.put("/:id", voucherController.update);
router.delete("/:id", voucherController.remove);

module.exports = router;