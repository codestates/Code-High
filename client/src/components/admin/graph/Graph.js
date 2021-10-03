import React from 'react';
import { Bar } from 'react-chartjs-2'
import {useSelector, useDispatch } from 'react-redux';
import { getUsersChart } from '../../../redux/actions/adminActions';

const Graph = () => {
    const usersChartState = useSelector((state) => state.adminReducer)
    const { usersChart } = usersChartState;
    const dispatch = useDispatch();
    
    console.log(usersChartState, '차트정보 불러오기')

    // useEffect(() => {
    //     const data = {
    //       accessToken: userInfo ? userInfo.accessToken : undefined,
    //     };
    //     dispatch(getUsersChart(data));
    // }, []); 




    const chartData = {
        labels: ['5월', '6월', '7월', '8월', '9월', '10월'],
        datasets: [{
        label: '사용자 수',
        backgroundColor: 'blue',
        data: [30,40,50,60,70,80,],
        fill: false,
        tension: 0.1
        },
        {
        label: '게시글 수',
        backgroundColor:'green',
        data: [100,110,100,90,80,170,],
        fill: false,
        tension: 0.1   
        }]
    }

    return (
        <div className='admin-graph-main'>
            <div className='admin-graph-main-container'>
                <div className='admin-graph-subject'>
                사용자 현황
                </div>
                <div className='admin-status-graph-container'>
                    <div className='admin-graph'>
                        <Bar
                        data={chartData}
                        options={{ maintainAspectRatio: false }}
                        />
                    </div>
                    <div className='admin-graph-status'> 
                        <div>   
                            <div> 총 사용자 250명</div>
                            <div> 총 게시글 수 810개</div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Graph;