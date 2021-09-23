import { Request, Response } from "express"
import { Comment } from "../entity/Comment"

// Comment list
export const commentList = async (req: Request, res: Response) => {
  try {
    const commentList = await Comment.find();
    if (!commentList) {
      res.status(404).send({ message: 'not found' });
    } 
    res.status(200).send({ commentList, message: 'ok'});
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// [admin] delete many comment 
export const deleteCommentList = async (req: Request, res: Response) => {
  try {
    const commentInfo: number[] = req.body.commentList;
    const commentDB = await Comment.findByIds(commentInfo);
    console.log(commentDB);
    if (!commentInfo) {
      res.status(404).send({ message: 'comment not found' });
    } else {
      res.status(200).send({ message: 'ok'});
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// 글에 달린 댓글 목록
export const commentPostList = async (req: Request, res: Response) => {
  try {
    
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// 댓글 목록 권한
export const commentAuthSetting = async (req: Request, res: Response) => {
  try {

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// 댓글 달기
export const editComment = async (req: Request, res: Response) => {
  try {

  } catch (err) {
    res.status(400).send({ message: err.message });
  } 
}

// [user] delete one comment
export const deleteCommentOne = async(req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const commentInfo = await Comment.findOne({ where: { id }});
    if (!commentInfo) {
      res.status(404).send({ message: 'not found' });
    } else {
      await commentInfo.remove();
      res.status(200).send({ message: 'delete comment successfully'});
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}