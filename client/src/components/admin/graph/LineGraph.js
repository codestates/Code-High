import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostActive } from '../../../redux/actions/userActions';

function LineGraph() {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo, userPostActive } = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      accessToken: userInfo ? userInfo.accessToken : undefined,
    };
    dispatch(getUserPostActive(data));
  }, []);

  const chartData = {
    labels: userPostActive ? userPostActive.dateList : [],
    datasets: [{
      label: '작성 코드',
      backgroundColor: 'RGB(47, 140, 76, 0.5)',
      data: userPostActive ?userPostActive.countList : [],
      fill: true,
      tension: 0.1
    }]
  }

  const option = {
    yAxes: [{
      ticks: { 
        beginAtZero: true,
      }
    }],
    maintainAspectRatio: false,
  }

  return (
    <div className='line-graph-container'>
      <Line className='line-graph' data={chartData} options={option}/>
    </div>
  )
}

export default LineGraph;