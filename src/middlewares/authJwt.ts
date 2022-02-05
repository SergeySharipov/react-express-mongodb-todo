import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import config from "../config/auth.config";
import db from "../models";
import { IRequest } from "../types/types";

const User = db.user;
const Role = db.role;

function instanceOfIRequest(object: any): object is IRequest {
    return object !== undefined && 'userId' in object;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | string[] | undefined = req.headers["x-access-token"];

    if (!token || typeof token !== "string") {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (decoded != null && typeof decoded !== "string" && instanceOfIRequest(req)) {
            req.userId = decoded.id;
        }
        next();
    });
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (instanceOfIRequest(req)) {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            Role.find(
                {
                    _id: { $in: user?.roles }
                },
                (err, roles) => {
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
                }
            );
        });
    } else {
        res.status(500).send({ message: "instanceOfIRequest()" });
        return;
    }
};

const isModerator = (req: Request, res: Response, next: NextFunction) => {
    if (instanceOfIRequest(req)) {
        User.findById(req.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err.message });
                return;
            }

            Role.find(
                {
                    _id: { $in: user?.roles }
                },
                (err, roles) => {
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
                }
            );
        });
    } else {
        res.status(500).send({ message: "instanceOfIRequest()" });
        return;
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
export default authJwt