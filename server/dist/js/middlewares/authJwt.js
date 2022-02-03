"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = __importDefault(require("../config/auth.config"));
const models_1 = __importDefault(require("../models"));
const User = models_1.default.user;
const Role = models_1.default.role;
function instanceOfIRequest(object) {
    return object !== undefined && 'userId' in object;
}
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token || typeof token !== "string") {
        return res.status(403).send({ message: "No token provided!" });
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.default.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (decoded != null && typeof decoded !== "string" && instanceOfIRequest(req)) {
            req.userId = decoded.id;
        }
        next();
    });
};
const isAdmin = (req, res, next) => {
    if (instanceOfIRequest(req)) {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
            Role.find({
                _id: { $in: user === null || user === void 0 ? void 0 : user.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            });
        });
    }
    else {
        res.status(500).send({ message: "instanceOfIRequest()" });
        return;
    }
};
const isModerator = (req, res, next) => {
    if (instanceOfIRequest(req)) {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }
            Role.find({
                _id: { $in: user === null || user === void 0 ? void 0 : user.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err.message });
                    return;
                }
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            });
        });
    }
    else {
        res.status(500).send({ message: "instanceOfIRequest()" });
        return;
    }
};
const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
exports.default = authJwt;
