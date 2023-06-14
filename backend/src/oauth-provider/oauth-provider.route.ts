import oAuthProviderController from "./oauth-provider.controller";

const express = require("express")
const router = express.Router();

router.get("/", oAuthProviderController.findAll);
router.get("/:id", oAuthProviderController.findOne);
router.post("/", oAuthProviderController.create);
router.put("/:id", oAuthProviderController.update);
router.delete("/:id", oAuthProviderController.remove);

module.exports = router;