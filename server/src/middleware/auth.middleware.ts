import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import User from '../models/user.schema';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded || typeof decoded === 'string') {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findById((decoded as jwt.JwtPayload).id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized' });
    }
}

export default verifyToken;