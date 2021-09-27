import * as schedule from 'node-schedule';

const test = () => schedule.scheduleJob('*/5 * * * * *', () => {
  console.log('hello');
})

export { test }

// 매주 월요일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장
const weekStat = () => schedule.scheduleJob('', () => {

})

// 매달 1일 12시 사용자 수, 코드 수, 리뷰 댓글 수 저장