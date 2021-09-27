import { Router } from "express";
import * as commentController from '../controllers/comment'
import { checkAuth } from "../middleware/checkAuth";
import { checkRole } from "../middleware/checkRole";

const commentRouter = Router();

commentRouter.use('/', checkAuth);
commentRouter.use('/', checkRole);

commentRouter.get('/', commentController.commentList);
commentRouter.delete('/', commentController.deleteCommentList);
commentRouter.delete('/:id', commentController.deleteComment);
commentRouter.post('/', commentController.addComment);


export default commentRouter;