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

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1
        }
      }
    }
  }

  return (
    <div className='line-graph-container'>
      <Line data={chartData} legend={legend} options={options} />
    </div>
  )
}

export default LineGraph;