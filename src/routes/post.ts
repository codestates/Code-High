import { Router } from 'express';
import * as postController from '../controllers/post';
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';
import * as commentController from '../controllers/comment';

const postRouter = Router();

postRouter.use('/', checkAuth);
postRouter.use('/', checkRole);

postRouter.patch('/tag', postController.editUnderstandLevel);
postRouter.get('/:id/comment', commentController.commentListByPostId)
postRouter.get('/:id', postController.getPostById);
postRouter.patch('/:id', postController.editPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.get('/', postController.getPostList);
postRouter.post('/', postController.addPost);
postRouter.delete('/', postController.deletePostList)
export default postRouter;