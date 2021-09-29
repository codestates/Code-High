import { Request, Response } from 'express'
import { Comment } from '../entity/Comment'
import { Post } from '../entity/Post'

const userActiveStat = async (req: Request, res: Response) => {
  if (req.body.userRole > 4 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const postCnt = await Post.count({ userId: req.body.authUserId })
  const commentCnt = await Comment.count({ userId: req.body.authUserId });
  const highCompCnt = await Post.createQueryBuilder('post')
  .leftJoin('post.postTags', 'postTag')
  .where('postTag.tagId = :id', { id: 23 })
  .getCount();

  res.status(200).send({ postCnt, commentCnt, highCompCnt })
}

// 월별 코드 작성 현황


export {
  userActiveStat
}