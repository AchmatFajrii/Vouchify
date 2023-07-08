import express, { Application, Request, Response } from "express";

const bannerRoutes = require('./banner/banner.route');
const authRoutes = require("./auth/auth.route");
const gameCategoryRoutes = require("./game-category/game-category.routes");
const gameRoutes = require("./game/game.routes");
const specialOfferRoutes = require("./special-offer/special-offer.route");
const voucherRoutes = require("./voucher/voucher.route");
const voucherTypeRoutes = require("./voucher-type/voucher-type.route");
const transactionRoutes = require("./transaction/transaction.route");
const profileRoutes = require("./profile/profile.route");
const discountRoutes = require("./discout/discount.route");
const oAuthProviderRoutes = require("./oauth-provider/oauth-provider.route");

let bodyParser = require('body-parser');


class App {
  public app: Application;

  constructor() {

    this.app = express();
    const helmet = require("helmet");
    const session = require('express-session');
    const passport = require('passport');
    const fileUpload = require('express-fileupload');
    const cors = require('cors');
    
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(session({secret: 'cats'}));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    // this.app.use(fileUpload());

    // this.app.use(express.static(__dirname + 'public'));

    this.routes();
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Welcome home");
    });

    this.app.use('/banners', bannerRoutes);
    this.app.use('/auth', authRoutes);
    this.app.use("/game-categories", gameCategoryRoutes);
    this.app.use("/special-offers", specialOfferRoutes);
    this.app.use("/discounts", discountRoutes);
    this.app.use("/vouchers", voucherRoutes);
    this.app.use("/voucher-types", voucherTypeRoutes);
    this.app.use("/games", gameRoutes);
    this.app.use("/transactions", transactionRoutes);
    this.app.use("/profile", profileRoutes);
    this.app.use("/oauth-providers", oAuthProviderRoutes);
  }
}

const port: number = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started successfully");
});
