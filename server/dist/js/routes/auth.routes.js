"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.post("/api/auth/signup", [
    middlewares_1.verifySignUp.checkDuplicateUsernameOrEmail,
    middlewares_1.verifySignUp.checkRolesExisted
], auth_controller_1.default.signup);
router.post("/api/auth/signin", auth_controller_1.default.signin);
exports.default = router;
