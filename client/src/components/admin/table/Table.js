import React from 'react';
import Button from '../../basic/button/Button'

const Table = () => {
    const userPostData = 
    [
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'parkcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jangcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'gocoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jicoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jungcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jeoncoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'parkcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jangcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'gocoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jicoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jungcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'jeoncoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
        {email:'kimcoding@test.kr', post:'js,dfs' , date:'2021.08.21'},
    ]

    const userCommentData = 
    [
        {post:'[알고리즘1]', comment:'OOOOOOOOO'},
        {post:'[알고리즘2]', comment:'OOOOOOOOO'},
        {post:'[알고리즘3]', comment:'OOOOOOOOO'},
        {post:'[알고리즘4]', comment:'OOOOOOOOO'},
        {post:'[알고리즘5]', comment:'OOOOOOOOO'},
        {post:'[알고리즘6]', comment:'OOOOOOOOO'},
    ]




    return (
        <>
        <div className='admin-table-main'>
            <div className='admin-table-sub'>
                <div className='admin-table-subject'>
                게시글 현황 및 관리
                </div>
            </div>
            <div className='admin-table-sub'>
                <div className='admin-table-container'>
                    <div className='admin-table-post-status'>
                        <div className='admin-table-button-box'>
                            <div>게시글 {userPostData.length}개</div>
                            <div className='admin-button'>
                            <Button content='Remove' backgroundColor='#2F8C4C' color='#fff' />
                            </div>
                        </div>
                        <div className='admin-table-post-data'>
                            <tr>
                                <th>#</th>
                                <th>메일</th>
                                <th>게시글</th>
                                <th>날짜</th>
                            </tr>
                            {
                    userPostData.map((el,index)=>{                         
                                return(
                                    <tr key={index}>
                                        <td>[ ]</td>
                                        <td>{el.email}</td>
                                        <td>{el.post}</td>
                                        <td>{el.date}</td>
                                    </tr>
                                )    
                                })
                            }
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
                            <tr>
                                <th>#</th>
                                <th>No</th>
                                <th>Name</th>
                                <th>comment</th>
                            </tr>
                            {
                    userCommentData.map((el,index)=>{                         
                                return(
                                    <tr>
                                        <td>[ ]</td>
                                        <td>{index}</td>
                                        <td>{el.post}</td>
                                        <td>{el.comment}</td>
                                    </tr>
                                )    
                                })
                            }
                        </div>
                    </div>               
                </div>
            </div>
        </div>
        </>
    );
};

export default Table;