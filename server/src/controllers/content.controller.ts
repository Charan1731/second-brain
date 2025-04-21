import { RequestHandler } from "express";
import Content from "../models/content.schema";

export const createContent: RequestHandler = async (req, res) => {
    try {

        await Content.create({
            ...req.body,
            userId: req.user._id,
        })

        res.status(200).json({
            success: true,
            message: "Content created successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const getUserContent: RequestHandler = async (req, res) => {
    try {

        const id = req.user._id;

        const content = await Content.find({userId: id}).populate("userId", "username");

        if(!content){
            res.status(404).json({
                success: false,
                message: "No content found",
            })
        }

        res.status(200).json({
            success: true,
            content: content,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export const deleteUserContent: RequestHandler = async (req, res) => {
    try {

        const contentId = req.params.id;
        const content = await Content.findByIdAndDelete(contentId);
        if(!content){
            res.status(404).json({
                success: false,
                message: "Content not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Content deleted successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}