import User from "../models/user.schema";
import { Request, Response, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const signup: RequestHandler = async (req, res) => {
    
    try {

        const {username, email, password} = req.body;

        if(!username || !email || !password){
            res.status(411).json({
                success: false,
                message: "Please provide all the fields",
            });
            return;
        }

        const findUser = await User.findOne({email});

        if(findUser){
            res.status(403).json({
                success: false,
                message: "User already exists",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: user,
            token: token,
        });
        

    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

export const signin: RequestHandler = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password){
            res.status(411).json({
                success: false,
                message: "Please provide all the fields",
            });
            return;
        }

        const findUser = await User.findOne({email});

        if(!findUser){
            res.status(403).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);

        if(!isPasswordValid){
            res.status(403).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }

        const token = jwt.sign(
            { id: findUser._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user:{
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            },
            token: token,
        });
        
        
        
        
    } catch (error: any) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}