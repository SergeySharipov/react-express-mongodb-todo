"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const middlewares_1 = require("../middlewares");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});
router.get("/api/test/all", user_controller_1.default.allAccess);
router.get("/api/test/user", [middlewares_1.authJwt.verifyToken], user_controller_1.default.userBoard);
router.get("/api/test/mod", [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isModerator], user_controller_1.default.moderatorBoard);
router.get("/api/test/admin", [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isAdmin], user_controller_1.default.adminBoard);
exports.default = router;
