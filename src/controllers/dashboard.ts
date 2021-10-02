import { Request, Response } from 'express'
import { Between } from 'typeorm'
import { Comment } from '../entity/Comment'
import { Post } from '../entity/Post'
import { Stat } from '../entity/stat'
import { dateFormat } from '../utils/dateFormat'

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

// 일별 코드 작성 현황
const dateStat = async (req: Request, res: Response) => {
  const today = dateFormat.today();
  const fourDayAgo = dateFormat.calculateDate(-4);
  const day = await Stat.find({ date: Between(fourDayAgo, today)});

  const date = await Stat.createQueryBuilder()
  .orderBy('date', 'DESC')
  .limit(4)
  .getMany()

  date.reverse();

  const stat = {
    days: [],
    postCount: [],
    commentCount: [],
    joinCount: [],
    visitCount: []
  }

  date.forEach((el) => {
    stat.days.push(dateFormat.formatDate(el.date));
    stat.postCount.push(el.postCount);
    stat.commentCount.push(el.commentCount);
    stat.joinCount.push(el.joinCount);
    stat.visitCount.push(el.visitCount);
  })

  res.status(200).send({ stat });
}

const monthStat = async (req: Request, res: Response) => {
  const month = await Stat.createQueryBuilder()
  .select(['date', 'SUM(postCount) AS postCount', 'SUM(commentCount) AS commentCount', 'SUM(joinCount) AS joinCount', 'SUM(visitCount) AS visitCount'])
  .groupBy('MONTH(date)')
  .orderBy('date', 'DESC')
  .limit(4)
  .getRawMany()

  month.reverse();

  const stat = {
    days: [],
    postCount: [],
    commentCount: [],
    joinCount: [],
    visitCount: []
  }

  month.forEach((el) => {
    stat.days.push(`${el.date.getMonth() + 1}월`);
    stat.postCount.push(el.postCount);
    stat.commentCount.push(el.commentCount);
    stat.joinCount.push(el.joinCount);
    stat.visitCount.push(el.visitCount);
  })

  res.status(200).send({ stat });
}

export {
  userActiveStat,
  dateStat,
  monthStat
}