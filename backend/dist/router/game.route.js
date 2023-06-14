"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_controller_1 = __importDefault(require("../game/game.controller"));
const base_router_1 = __importDefault(require("./base.router"));
class GameRoutes extends base_router_1.default {
    routes() {
        this.router.get("", game_controller_1.default.findAll);
    }
}
exports.default = new GameRoutes().router;
