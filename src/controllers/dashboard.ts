import { Request, Response } from 'express'
import { Between } from 'typeorm'
import { Comment } from '../entity/Comment'
import { Post } from '../entity/Post'
import { Stat } from '../entity/stat'
import { User } from '../entity/User'
import { dateFormat } from '../utils/dataFormat'

const userTotalStat = async (req: Request, res: Response) => {
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

const userWeekStat = async (req: Request, res: Response) => {
  if (req.body.userRole > 4 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const after = dateFormat.calculateDate(-6);

  const postCountList = await Post.createQueryBuilder()
  .select(['date_format(createdAt, \'%Y-%m-%d\') AS date', 'COUNT(id) AS count'])
  .where('createdAt >= :after', { after })
  .andWhere('userId = :id', { id: req.body.authUserId })
  .groupBy('Date(createdAt)')
  .getRawMany()

  const commentCountList = await Comment.createQueryBuilder()
  .select(['date_format(createdAt, \'%Y-%m-%d\') AS date', 'COUNT(id) AS count'])
  .where('createdAt >= :after', { after })
  .andWhere('userId = :id', { id: req.body.authUserId })
  .groupBy('Date(createdAt)')
  .getRawMany()

  const dateList = [];
  const postList = new Array(7).fill("0");
  const commentList = new Array(7).fill("0");
  for (let i = 6; i >= 0; i--) {
    const date = dateFormat.calculateDate(-i);
    dateList.push(date);
  }

  postCountList.forEach((el) => {
    const day = dateFormat.getNumberOfDays(after, el.date);
    postList[day] = el.count;
  })

  commentCountList.forEach((el) => {
    const day = dateFormat.getNumberOfDays(after, el.date);
    commentList[day] = el.count;
  })

  res.status(200).send({ dateList, postList, commentList });
}

// 일별 코드 작성 현황
const dateStat = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const today = dateFormat.today();
  const sixDayAgo = dateFormat.calculateDate(-6);
  const day = await Stat.find({ date: Between(sixDayAgo, today)});

  const date = await Stat.createQueryBuilder()
  .orderBy('date', 'DESC')
  .limit(6)
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

  const userCount = await User.count();
  const postCount = await Post.count();

  res.status(200).send({ stat, total: { userCount, postCount } });
}

const weekStat = async (req: Request, res: Response) => {
  if (req.body.userRole !== 1) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const week = await Stat.createQueryBuilder()
  .select(['CONCAT(YEAR(date), \'-\', Month(date), \' \', WEEK(date)) AS date'])
  .groupBy('CONCAT(YEAR(date), \'-\', Month(date), \' \', WEEK(date))')
  .getRawMany()

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
  .limit(6)
  .getRawMany()

  month.reverse();

  const stat = {
    months: [],
    postCount: [],
    commentCount: [],
    joinCount: [],
    visitCount: []
  }

  month.forEach((el) => {
    stat.months.push(el.date);
    stat.postCount.push(el.postCount);
    stat.commentCount.push(el.commentCount);
    stat.joinCount.push(el.joinCount);
    stat.visitCount.push(el.visitCount);
  })

  const userCount = await User.count();
  const postCount = await Post.count();

  res.status(200).send({ stat, total: { userCount, postCount } });
}

export {
  userTotalStat,
  userWeekStat,
  dateStat,
  weekStat,
  monthStat
}