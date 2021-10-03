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
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

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

const weekStat = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const week = await Stat.createQueryBuilder()
  .select(['CONCAT(YEAR(date), \'-\', Month(date), \' \', WEEK(date)) AS date'])
  .groupBy('CONCAT(YEAR(date), \'-\', Month(date), \' \', WEEK(date))')
  .getRawMany()

  console.log(week)


  res.status(200).send('test');
}

const monthStat = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const month = await Stat.createQueryBuilder()
  .select(['CONCAT(YEAR(date), \'-\', Month(date)) AS date', 'SUM(postCount) AS postCount', 'SUM(commentCount) AS commentCount', 'SUM(joinCount) AS joinCount', 'SUM(visitCount) AS visitCount'])
  .groupBy('CONCAT(YEAR(date), \'-\', Month(date))')
  .orderBy('MONTH(date)', 'DESC')
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
    stat.days.push(el.date);
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
  weekStat,
  monthStat
}