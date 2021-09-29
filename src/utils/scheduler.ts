import * as schedule from 'node-schedule';
import { User } from '../entity/User';

const test = () => schedule.scheduleJob('*/2 * * * * *', () => {
  const currentTime = new Date(Date.now() + 9 * 60 * 60 * 1000);
  console.log(currentTime, currentTime.getFullYear() + '-' + currentTime.getMonth() + '-' + currentTime.getDay());
})

// remove unverified user everyday
const checkVerifiedUser = () => schedule.scheduleJob('59 23 * * *', async () => {
  const removeUserList = await User.find({ verified: false });
  await User.remove(removeUserList);
})

// 매주 월요일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장
const weekStat = () => schedule.scheduleJob('0', async () => {
  
  // const userCnt = await User.count({ verified: true });
  
})

// 매달 1일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장

export { 
  test,
  checkVerifiedUser
}