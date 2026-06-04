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
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Token missing",
        });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET!) as jwt.JwtPayload;

        req.userId = data.id;

        next();
        
    } catch (error) {
        res.status(403).json({ message : "invalid token"});
    }
}