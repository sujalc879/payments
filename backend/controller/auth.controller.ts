import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
import { accountModel, userModel } from '../db/db';
const JWT_SECRET = process.env.JWT_SECRET;

export async function signup(
    req: Request,
    res: Response
) {
    const inputBody = z.object({
        email : z.email(),
        password : z.string().min(3).max(200),
        firstName : z.string().min(3).max(100),
        lastName : z.string().min(3).max(100)
    });

    const result = inputBody.safeParse(req.body);

    if (!result.success) {
        res.status(403).json({ message : "inputs are incorrect"});
        return;
    };
    
    const hashedPassword = await bcrypt.hash(result.data.password, 5);
    
    try {
        const user = await userModel.create({
            email : result.data.email,
            password : hashedPassword,
            firstName : result.data.firstName,
            lastName : result.data.lastName
        });

        const amount = Math.round(Math.random() * 1000);

        await accountModel.create({
            userId : user._id,
            balance : amount
        });

        res.status(200).json({ message : "user created successfully"});

    } catch (error) {
        res.status(403).json({ message : "this email is already exist try different one"});
        
    }
};

export async function signin(
    req: Request,
    res: Response
) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        res.status(403).json({ message : "invalid credentials"});
        return;
    };
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
        res.status(403).json({ message : "invalid credentials"});
        return;
    };

    const token = jwt.sign({
        id : user._id
    }, JWT_SECRET!);

    res.status(200).json({ token });
    
};

