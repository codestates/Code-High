import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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
    datasets: [
      {
        label: '작성 코드',
        backgroundColor: 'RGB(47, 140, 76, 0.5)',
        borderColor: 'RGB(47, 140, 76, 0.5)',
        data: userPostActive ? userPostActive.postList : [],
        fill: false,
        tension: 0.1,
      },
      {
        label: '작성 댓글',
        backgroundColor: 'RGB(189, 188, 188, 0.5)',
        borderColor: 'RGB(189, 188, 188)',
        data: userPostActive ? userPostActive.commentList : [],
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    // responsive: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='line-graph-container'>
      <Line className='line-graph' width='910px' height='310px' data={chartData} options={options} />
    </div>
  );
}

export default LineGraph;
