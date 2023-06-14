import discountController from "./discount.controller";

const express = require("express")
const router = express.Router();

router.get("/", discountController.findAll);
router.get("/:id", discountController.findOne)
router.post("/", discountController.create);
router.put("/:id", discountController.update);
router.delete("/:id", discountController.remove);

module.exports = router;