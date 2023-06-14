import transactionController from "./transaction.controller";
const { isAuthenticated } = require("../utils/middleware/is-auth.middleware");

const express = require("express");
const router = express.Router();

router.post("/send-invoice/:id", isAuthenticated, transactionController.sendInvoice);
router.post("/", isAuthenticated, transactionController.create);
router.put("/:id", transactionController.update);
router.put("/confirmation/:id", isAuthenticated, transactionController.confirmation);
router.get("/my-transactions", isAuthenticated, transactionController.findAllByUser);
router.get("/tracking/:transactionNumber", isAuthenticated, transactionController.trackingTransaction);

module.exports = router;