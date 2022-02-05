"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_routes_1 = __importDefault(require("./todo.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const routes = { todoRoutes: todo_routes_1.default, authRoutes: auth_routes_1.default, userRoutes: user_routes_1.default };
exports.default = routes;
