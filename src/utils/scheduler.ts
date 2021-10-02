import * as schedule from 'node-schedule';
import { Between } from 'typeorm';
import { User } from '../entity/User';
import * as moment from 'moment';
import { dateFormat } from './dateFormat';
import { Post } from '../entity/Post';
import { Comment } from '../entity/Comment';
import { Stat } from '../entity/stat';

const test = () => schedule.scheduleJob('*/2 * * * * *', () => {
  const currentTime = new Date();
  // console.log(currentTime, currentTime.getFullYear() + '-' + currentTime.getMonth() + '-' + currentTime.getDate());
  console.log(currentTime)
})

// remove unverified user everyday
const checkVerifiedUser = () => schedule.scheduleJob('59 23 * * *', async () => {
  const removeUserList = await User.find({ verified: false });
  await User.remove(removeUserList);
})

// 매일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장
const weekStat = () => schedule.scheduleJob('0 * * *', async () => {
  const today = dateFormat.today();
  const yesterday = dateFormat.yesterday();
  
  const postCount = await Post.count({ createdAt: Between(yesterday, today) });
  const commentCount = await Comment.count({ createdAt: Between(yesterday, today) });
  const joinCount = await User.count({ verified: true, createdAt: Between( yesterday, today)});
  const visitCount = await User.count({ lastLoginDate: Between(yesterday, today) });
  
  const newStat = Stat.create({
    date: yesterday,
    postCount,
    commentCount,
    joinCount,
    visitCount
  })
  await Stat.save(newStat);
})


export { 
  test,
  checkVerifiedUser,
  weekStat
}