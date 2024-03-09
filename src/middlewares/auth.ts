import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AppConfig } from "../config/config"
const config = AppConfig.config

export type CustomRequest = Request & {
    email?: string;
    id?: string;
    role?: string;
    user?: string;
};

const authenticateToken = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        return res.status(401).json({ success: false, message: "Access token not provided" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied" });
    }

    try {
        let decoded: any;
        if (config.SECRET_KEY) {
          decoded = jwt.verify(token, config.SECRET_KEY as Secret);
        } else {
            return res.status(401).json({ success: false, message: "Missing secret key" });
        }
        req.email = decoded.email;
        req.id = decoded.id;
        req.role = decoded.role;
        req.user = decoded.user;
        next();
      } catch (error) {
        res.status(401).send({ success: false, message: "Unauthorized" });
        return;
      }
 
};

export { authenticateToken }