import { Router } from "express";
import verifyToken from "../middleware/auth.middleware";
import { createContent, getUserContent } from "../controllers/content.controller";


const contentRouter = Router();

contentRouter.post('/', verifyToken, createContent );

contentRouter.get('/',verifyToken, getUserContent)

export default contentRouter;