import React from 'react';

const Graph = () => {
    return (
        <div className='admin-graph-main'>
            <div className='admin-graph-main-container'>
                <div className='admin-graph-subject'>
                사용자현황
                </div>
                <div className='admin-status-graph-container'>
                    <div className='admin-graph'>
                        그래프
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