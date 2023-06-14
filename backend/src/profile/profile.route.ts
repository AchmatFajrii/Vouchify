import profileController from "./profile.controller"
const { isAuthenticated } = require("../utils/middleware/is-auth.middleware");

const express = require("express")
const router = express.Router();

router.get("/", isAuthenticated, profileController.myProfile);
router.put("/", isAuthenticated, profileController.update);
router.put("/change-password", isAuthenticated, profileController.changePassword);
router.put("/new-password", isAuthenticated, profileController.newPassword);

module.exports = router;