import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment"
import { User } from "../entity/User";

// [admin] Comment list
export const commentList = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }
  const commentList = await getRepository(Comment)
  .createQueryBuilder('comment')
  .select(['comment.id AS id', 'comment.content AS content', 'comment.userId AS userId', 'comment.postId AS postId', 'comment.createdAt AS createdAt', 'comment.updatedAt AS updatedAt'])
  .addSelect('user.name', 'userName')
  .leftJoin('comment.user', 'user')
  .getRawMany();
  res.status(200).send({ commentList, message: 'ok'})
}

// get post comment
export const commentListByPostId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = req.query.page;
    const pageOffset = (Number(page) - 1) * 6;
    const pageCount = 6;

    if (!page) {
      // const commentInfo = await Comment.find({ where : {postId: id} });
      const commentList = await getRepository(Comment)
      .createQueryBuilder('comment')
      .select(['comment.id AS id', 'comment.content AS content', 'comment.userId AS userId', 'comment.postId AS postId', 'comment.createdAt AS createdAt', 'comment.updatedAt AS updatedAt'])
      .addSelect('user.name', 'userName')
      .leftJoin('comment.user', 'user')
      .where('comment.postId = :id', { id })
      .orderBy('createdAt', 'DESC')
      .getRawMany();
      return res.status(200).send({ commentList, message: 'ok' });
    } else {
      const result = await getRepository(Comment)
      .createQueryBuilder('comment')
      .select(['comment.id AS id', 'comment.content AS content', 'comment.userId AS userId', 'comment.postId AS postId', 'comment.createdAt AS createdAt', 'comment.updatedAt AS updatedAt'])
      .addSelect('user.name', 'userName')
      .leftJoin('comment.user', 'user')
      .where('comment.postId = :id', { id })
      .orderBy('comment.createdAt', 'DESC')
      .offset(pageOffset)
      .limit(pageCount)
      .getRawMany();
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

    if (newComment.content.length === 0) {
      return res.status(400).send({ message: 'bad request' });
    } 

    await Comment.save(newComment);
    return res.status(200).send({ message: 'ok' });

  } catch (err) {
    return res.status(400).send({ message: err.message });
  } 
}

//edit comment
export const editComment = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }
  
  try {
    const id = Number(req.params.id);
    const commentById = await Comment.findOne(id);

    if (!commentById) {
      return res.status(404).send({ message: 'comment not found' });
    } 
    if (commentById.userId !== req.body.authUserId) {
      return res.status(403).send({ message: 'forbidden' });
    }

    const { content } = req.body;
    if (content.length === 0) {
      return res.status(400).send({ message: 'bad request' });
    }
    await Comment.update({ id }, { content });
    res.status(200).send({ message: 'ok' });
  
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

// [admin] delete many comment
export const deleteCommentList = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  try {
    const commentList = req.body.commentList;
    let deleteList;
    
    if (req.body.userRole !== 1) {
      deleteList = await Comment.findByIds(commentList, {where: { userId: req.body.authUserId}})
    } else {
      deleteList = await Comment.findByIds(commentList);
    }

    if (deleteList.length === 0) {
      return res.status(422).send({ message: 'select comment' });
    } else {
      await Comment.remove(deleteList);
      return res.status(200).send({ message: 'ok'});
    }
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