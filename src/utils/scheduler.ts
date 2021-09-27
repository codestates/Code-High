import * as schedule from 'node-schedule';
import { User } from '../entity/User';

const test = () => schedule.scheduleJob('*/1 * * * * *', () => {
  const currentTime = new Date()
  console.log(currentTime.getFullYear() + '-');
})


// 매주 월요일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장
const weekStat = () => schedule.scheduleJob('0', async () => {
  
  // const userCnt = await User.count({ verified: true });
  
})

// 매달 1일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장

export { test }