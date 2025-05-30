"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", user_controller_1.signup);
userRouter.post("/signin", user_controller_1.signin);
exports.default = userRouter;
