import * as schedule from 'node-schedule';
import { Between } from 'typeorm';
import { User } from '../entity/User';
import * as moment from 'moment';

const test = () => schedule.scheduleJob('*/2 * * * * *', () => {
  const currentTime = moment().format();
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
  const today = moment().add(-1, 'days')
  console.log(today);
  
  const userCnt = await User.count({ verified: true, createdAt: Between('2021-09-28' , '2021-09-29')});
  //console.log(userCnt);
})


export { 
  test,
  checkVerifiedUser,
  weekStat
}