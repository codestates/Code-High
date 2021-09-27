import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment"
import { User } from "../entity/User";

// Comment list
export const commentList = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const commentList = await Comment.find();
  return res.status(200).send({ commentList, message: 'ok'})
}

// [admin] delete many comment 
export const deleteCommentList = async (req: Request, res: Response) => {
  try {
    const commentList = req.body.commentList;
    const commentDB = await Comment.findByIds(commentList);
    
    if (!commentList) {
      return res.status(422).send({ message: 'select comment' });
    } else {
      
      if (commentDB.length === 0) {
        return res.status(400).send({ message: 'bad request' });
      } else {
        for (let i: number = 0; i < commentDB.length; i++) {
          await commentDB[i].remove();
        }
        return res.status(200).send({ message: 'ok'});
      }
    }

  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

// get post comment
export const commentListByPostId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = req.query.page;
    const pageOffset = (Number(page) - 1) * 15;
    const pageCount = 15;

    if (!page) {
      const commentInfo = await Comment.find({ where : {postId: id} });
      return res.status(200).send({ commentList: commentInfo, message: 'ok' });
    } else {
      const result = await getRepository(Comment).createQueryBuilder('comment')
      .where('comment.postId = :id', { id })
      .offset(pageOffset)
      .limit(pageCount)
      .getMany();
      return res.status(200).send({ commentList: result, message: 'ok' });
    }

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

// add comment
export const addComment = async (req: Request, res: Response) => {
  if (req.body.userRole > 3) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  try {
    const { content, postId, authUser } = req.body;
    const userInfo = await User.findOne({ where: { email: authUser }});
    const newComment = Comment.create({
      content,
      postId,
      userId: userInfo.id,
    });

    await Comment.save(newComment);
    return res.status(200).send({ message: 'ok' });

  } catch (err) {
    return res.status(400).send({ message: err.message });
  } 
}

// [user] delete comment
export const deleteComment = async(req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const commentInfo = await Comment.findOne({ where: { id }});
    
    if (!commentInfo) {
      return res.status(404).send({ message: 'not found' });
    } 

    // 글 작성자도 처리
    if (req.body.userRole !== 1 && commentInfo.userId !== req.body.authUserId) {
      return res.status(403).send({ message: 'forbidden'});
    }

    await commentInfo.remove();
    return res.status(200).send({ message: 'delete comment successfully'});


  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

