import authController from "./auth.controller";

require("../utils/oauth/google.oauth");

const express = require("express")
const router = express.Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.post('/google', authController.signGoogle);

router.get('/google/redirect',passport.authenticate('google', { 
    successRedirect: '/auth/google/protected',
    failureRedirect: '/auth/google/failure',
}),);

router.get('/google/protected', authController.authByGoogle);
router.get('/google/failure', (req: any, res: any) => {
    res.send("Something error")
});

router.post("/register", authController.create);
router.post("/refresh-token", authController.refreshToken);
router.post("/login", authController.login);
router.post("/google/register", authController.authByGoogle);

module.exports = router;