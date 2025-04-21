"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const content_controller_1 = require("../controllers/content.controller");
const contentRouter = (0, express_1.Router)();
contentRouter.post('/', auth_middleware_1.default, content_controller_1.createContent);
contentRouter.get('/', auth_middleware_1.default, content_controller_1.getUserContent);
exports.default = contentRouter;
