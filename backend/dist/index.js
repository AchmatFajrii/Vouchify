"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const game_route_1 = __importDefault(require("./router/game.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        const helmet = require("helmet");
        this.app.use(helmet());
        this.routes();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Welcome home");
        });
        this.app.use("/games", game_route_1.default);
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("Server started successfully");
});
