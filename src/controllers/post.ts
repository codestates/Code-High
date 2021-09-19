import { Request, Response } from 'express';

const getPostList = (req: Request, res: Response) => {
  res.send('postList');
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