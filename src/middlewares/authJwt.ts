import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { IRequest } from "../types/types";

function instanceOfIRequest(object: any): object is IRequest {
    return object !== undefined && 'userId' in object;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string | string[] | undefined = req.headers["x-access-token"];

    if (!token || typeof token !== "string") {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, config.AUTH_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (decoded != null && typeof decoded !== "string" && instanceOfIRequest(req)) {
            req.userId = decoded.id;
        }
        next();
    });
};

const authJwt = { verifyToken }

export default authJwt