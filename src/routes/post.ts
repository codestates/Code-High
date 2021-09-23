import { Router } from 'express';
import * as postController from '../controllers/post';
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';

const postRouter = Router();

postRouter.get('/:id', postController.getPost);
postRouter.patch('/:id', postController.editPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.get('/', postController.getPostList);
postRouter.post('/', checkAuth, checkRole, postController.addPost);

export default postRouter;