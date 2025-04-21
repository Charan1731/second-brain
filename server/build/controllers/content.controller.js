"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserContent = exports.createContent = void 0;
const content_schema_1 = __importDefault(require("../models/content.schema"));
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield content_schema_1.default.create(Object.assign(Object.assign({}, req.body), { userId: req.user._id }));
        res.status(200).json({
            success: true,
            message: "Content created successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.createContent = createContent;
const getUserContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user._id;
        const content = yield content_schema_1.default.find({ userId: id }).populate("userId", "username");
        if (!content) {
            res.status(404).json({
                success: false,
                message: "No content found",
            });
        }
        res.status(200).json({
            success: true,
            content: content,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getUserContent = getUserContent;
