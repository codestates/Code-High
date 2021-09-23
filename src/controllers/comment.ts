import { Request, Response } from "express"
import { Comment } from "../entity/Comment"

// 댓글 목록
export const commentList = async (req: Request, res: Response) => {
  try {
    const { userId, postId } = req.body;
    const commentInfo = await Comment.find({ where: { userId }});

    console.log(commentInfo);
    
    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// 댓글 삭제
export const commentDelete = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const commentInfo = await Comment.findOne({ where: { postId }});

    if (!commentInfo) {

    }
  } catch (err) {
      
  }
}

// 글에 달린 댓글 목록
export const commentPostList = async (req: Request, res: Response) => {
  try {

  } catch (err) {
      
  }
}

// 댓글 목록 권한
export const commentAuthSetting = async (req: Request, res: Response) => {
  try {

  } catch (err) {
      
  }
}

// 댓글 달기
export const commentPost = async (req: Request, res: Response) => {
  try {

  } catch (err) {
      
  } 
}