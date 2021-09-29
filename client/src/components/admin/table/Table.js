import React from 'react';
import Button from '../../basic/button/Button'

const Table = () => {
    return (
        <div className='admin-table-main'>
            <div className='admin-table-subject'>
            게시글 현황 및 관리
            </div>
            <div className='admin-table-container'>
                <div className='admin-table-post-status'>
                    <div className='admin-table-button-box'>
                        <div>게시글 187개</div>
                        <div className='admin-button'>
                        <Button content='Remove' backgroundColor='#2F8C4C' color='#fff' />
                        </div>
                    </div>
                    <div className='admin-table-post-data'>
                        <div>
                           
                        </div>
                        <div>
                            메일
                        </div>
                        <div>
                            게시글
                        </div>
                        <div>
                            날짜
                        </div>
                    </div>
                </div>
                <div className='admin-table-comment-status'>
                    <div className='admin-table-button-box'>
                        <div>
                        댓글 80개
                        </div>
                        <div className='admin-button'>
                        <Button content='Remove' backgroundColor='#2F8C4C' color='#fff' />
                        </div>  
                    </div>
                    <div className='admin-table-comment-box'>
                        <div>[] 1.[알고리즘1]OOOOOOOO</div>
                    </div>
                </div>               
            </div>
        </div>
    );
};

export default Table;