import specialOfferController from "./special-offer.controller";
import express from 'express';

const router = express.Router();

router.get("/", specialOfferController.findAll)
router.get("/active", specialOfferController.findActiveSpecialOffer)
router.post("/", specialOfferController.create)
router.put("/:id", specialOfferController.update)
router.get("/:id", specialOfferController.findOne)
router.delete("/:id", specialOfferController.remove)

module.exports = router;
