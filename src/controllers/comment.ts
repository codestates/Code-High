import { Request, Response } from "express"
import { Comment } from "../entity/Comment"
import { User } from "../entity/User";

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
    const commentInfo = req.body.commentList;
    const commentDB = await Comment.findByIds(commentInfo);
    if (!commentInfo) {
      res.status(404).send({ message: 'comment not found' });
    } else {
      if (commentDB.length === 0) {
        res.status(500).send({ message: 'internal server error' });
      } else {
        for (let i: number = 0; i < commentDB.length; i++) {
          await commentDB[i].remove();
        }
        res.status(200).send({ message: 'ok'});
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// get post comment
export const commentPostList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commentInfo = await Comment.find({ where: { postId: id }});
    res.status(200).send({ commentList: commentInfo, message: 'ok' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// edit comment
export const editComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, authUser } = req.body;
    const userInfo = await User.findOne({ where: { email: authUser }});
    const { name, id } = userInfo;

    const newComment = Comment.create({
      content,
      postId,
      userId: id,
      userName: name
    });
    res.status(200).send({ message: 'ok' });
    await Comment.save(newComment)
    
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

