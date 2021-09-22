import { Router } from 'express';
import * as postController from '../controllers/post';
const postRouter = Router();

postRouter.get('/:id', postController.getPost);
postRouter.patch('/:id', postController.editPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.get('/', postController.getPostList);
postRouter.post('/', postController.addPost);

export default postRouter;