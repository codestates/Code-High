import { Request, Response } from 'express';
import { Post } from '../entity/Post';

const getPostList = async (req: Request, res: Response) => {
  // const isSecret = [false]

  // // 관리자 권한이면 isSecret = [true, false]

  // const result = await Post.createQueryBuilder()
  // .where('secret In (:...isSecret)', { isSecret })
  // .getMany();
  // res.send({ postList: result });
  res.send('getPostList');
}

const getUserPostList = (req: Request, res: Response) => {
  res.send('getUserPostList');
}

const getPost = (req: Request, res: Response) => {
  res.send('getPost');
}

const addPost = (req: Request, res: Response) => {
  res.send('addPost');
}

const editPost = (req: Request, res: Response) => {
  res.send('editPost');
}

const deletePost = (req: Request, res: Response) => {
  res.send('deletePost');
}

export {
  getPostList,
  getUserPostList,
  getPost,
  addPost,
  editPost,
  deletePost
}