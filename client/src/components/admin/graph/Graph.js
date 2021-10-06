import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux';
import { getUsersChart } from '../../../redux/actions/adminActions';

const Graph = () => {
    const adminState = useSelector((state) => state.adminReducer);
    const { usersChart } = adminState
    const userState = useSelector((state) => state.userReducer);
    const { userInfo } = userState
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getUsersChart(userInfo.accessToken))
    },[]);

    console.log(usersChart,'🙁🙁🙁🙁🙁🙁')

    const chartData = {
        labels: usersChart.days,
        datasets: [{
        label: '방문자 수',
        backgroundColor: 'blue',
        data: usersChart.visitCount,
        fill: false,
        tension: 0.1
        },
        {
        label: '게시글 수',
        backgroundColor:'green',
        data: usersChart.postCount,
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
                        data={chartData === undefined ? (
                            로딩중
                        ):(
                            chartData
                        )}
                        options={{ maintainAspectRatio: false }}
                        />
                    </div>
                    <div className='admin-graph-status'> 
                        <div>   
                            <div> 방문자 수 {
                                usersChart === undefined ? (
                                    <h1>로딩 중</h1>
                                ) : (
                                usersChart.visitCount.reduce(function add(sum, currValue) {
                                    return sum + currValue;
                                }, 0)
                                )
                                }
                                명</div>
                            <div> 게시글 수 {
                                usersChart === undefined ? (
                                    <h1>로딩 중</h1>
                                ) : (
                                usersChart.postCount.reduce(function add(sum, currValue) {
                                    return sum + currValue;
                                }, 0))
                                }개</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graph;