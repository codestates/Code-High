import * as schedule from 'node-schedule';
import { Between } from 'typeorm';
import { User } from '../entity/User';
import * as moment from 'moment';
import { daySet } from './dateFormat';
import { Post } from '../entity/Post';
import { Comment } from '../entity/Comment';

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
const weekStat = () => schedule.scheduleJob('*/2 * * * * *', async () => {


  const today = daySet.today();
  const yesterday = daySet.yesterday();
  console.log(today, yesterday);
  
  const joinCount = await User.count({ verified: true, createdAt: Between( yesterday, today)});
  const postCount = await Post.count({ createdAt: Between(yesterday, today) });
  const commentCount = await Comment.count({ createdAt: Between(yesterday, today) })
  console.log(joinCount, postCount, commentCount);
})


export { 
  test,
  checkVerifiedUser,
  weekStat
}