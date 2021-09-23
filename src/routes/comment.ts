import { Router } from "express";
import * as commentController from '../controllers/comment'

const commentRouter = Router();

commentRouter.get('/', commentController.commentList);
commentRouter.delete('/', commentController.deleteCommentList);
commentRouter.delete('/:id', commentController.deleteCommentOne);


export default commentRouter;