import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET;

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export default function middleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const tokenWithBearer = req.headers.authorization;

    const splitToken = tokenWithBearer?.split(" ");
    
    if (!tokenWithBearer || !splitToken) {
        return res.status(401).json({
            message: "Token missing",
        });
    };

    const token = splitToken[1];
    
    try {
        const data = jwt.verify(token!, JWT_SECRET!) as jwt.JwtPayload;

        req.userId = data.id;

        next();
        
    } catch (error) {
        res.status(403).json({ message : "invalid token"});
    }
}