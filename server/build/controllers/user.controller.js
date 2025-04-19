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
exports.signin = exports.signup = void 0;
const user_schema_1 = __importDefault(require("../models/user.schema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.status(411).json({
                success: false,
                message: "Please provide all the fields",
            });
            return;
        }
        const findUser = yield user_schema_1.default.findOne({ email });
        if (findUser) {
            res.status(403).json({
                success: false,
                message: "User already exists",
            });
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield user_schema_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user: user,
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(411).json({
                success: false,
                message: "Please provide all the fields",
            });
            return;
        }
        const findUser = yield user_schema_1.default.findOne({ email });
        if (!findUser) {
            res.status(403).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, findUser.password);
        if (!isPasswordValid) {
            res.status(403).json({
                success: false,
                message: "Invalid password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: findUser._id,
                username: findUser.username,
                email: findUser.email,
            },
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});
exports.signin = signin;
