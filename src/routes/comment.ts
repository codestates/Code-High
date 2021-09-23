import { Router } from "express";
import * as commentController from '../controllers/comment'

const commentRouter = Router();

commentRouter.get('/', commentController.commentList);

export default commentRouter;