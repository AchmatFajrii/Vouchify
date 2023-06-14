import voucherTypeController from "./voucher-type.controller";

const express = require("express")
const router = express.Router();

router.get("/", voucherTypeController.findAll);
router.get("/:id", voucherTypeController.findOne);
router.post("/", voucherTypeController.create);
router.put("/:id", voucherTypeController.update);
router.delete("/:id", voucherTypeController.remove);

module.exports = router;