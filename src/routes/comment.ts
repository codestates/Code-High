import { Router } from "express";
import * as commentController from '../controllers/comment'
import { checkAuth } from "../middleware/checkAuth";
import { checkRole } from "../middleware/checkRole";

const commentRouter = Router();

commentRouter.get('/', checkAuth, checkRole, commentController.commentList);
commentRouter.delete('/', checkAuth, checkRole, commentController.deleteCommentList);
commentRouter.delete('/:id', checkAuth, checkRole, commentController.deleteCommentOne);
commentRouter.post('/', checkAuth, checkRole, commentController.editComment);


export default commentRouter;