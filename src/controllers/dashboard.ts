import { Request, Response } from 'express'
import { Comment } from '../entity/Comment'
import { Post } from '../entity/Post'

// 마이페이지 내 코드 현황
const userActive = async (req: Request, res: Response) => {
  const postCnt = await Post.count({userId: req.body.authUserId});
  const commentCnt = await Comment.count({ userId: req.body.authUserId });
  res.send({ postCnt, commentCnt })
}

// 월별 코드 작성 현황


export {
  userActive
}