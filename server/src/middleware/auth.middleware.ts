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

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (!decoded || typeof decoded === 'string') {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const user = await User.findById((decoded as jwt.JwtPayload).id);
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized' });
    }
}

export default verifyToken;