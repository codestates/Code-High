import React, { useEffect,  useState } from 'react';
import Button from '../../basic/button/Button'
import {useSelector, useDispatch } from 'react-redux';
import{
    getUsersPost,
    getUsersComment,
    deleteUsersPost,
    deleteUsersComment,
} from '../../../redux/actions/adminActions'

const Table = () => {

    const userCommentData = 
    [
        {id:'1', name:'김코딩', comment:'OOOOOOOOO'},
        {id:'2', name:'성코딩', comment:'OOOOOOOOO'},
        {id:'3', name:'전해커', comment:'OOOOOOOOO'},
        {id:'4', name:'장딩코', comment:'OOOOOOOOO'},
        {id:'5', name:'박코', comment:'OOOOOOOOO'},
        {id:'6', name:'유코', comment:'OOOOOOOOO'},
    ]
    //!test
    // const postState = useSelector((state) => state.codePostReducer);
    // const { postList,commentList} = postState;

    const adminState = useSelector((state) => state.adminReducer);
    const { usersPost } = adminState
    const dispatch = useDispatch();
    
    const userState = useSelector((state) => state.userReducer);
    const { userInfo } = userState
    
    useEffect(() =>{
        dispatch(getUsersPost(userInfo.accessToken))
        console.log(usersPost,'@@@@')
    },[]);

    // console.log(postList)



    //!test

    const [checkPostList, setCheckPostList] = useState([])
    const [checkCommentList, setCheckCommentList] = useState([])

    const getPostCheckboxId = (e, id) =>{
        if(e.target.checked){
            setCheckPostList([...checkPostList, id]);
        }
        else{
            setCheckPostList(checkPostList.filter((checkedId) => checkedId !== id))
        }
        console.log(checkPostList, 'PostList')
    }

    const getCommentCheckboxId = (e, id) =>{
        if(e.target.checked){
            setCheckCommentList([...checkCommentList, id]);
        }
        else{
            setCheckCommentList(checkCommentList.filter((checkedId) => checkedId !== id))
        }
        console.log(checkCommentList, 'CommentList')
    }



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
                            <div>게시글 {usersPost.length}개</div>
                            <div className='admin-button'>
                            <Button content='Remove' backgroundColor='#2F8C4C' color='#fff' />
                            </div>
                        </div>
                        <div className='admin-table-post-data'>
                            <tr>
                                <th></th>
                                <th>이메일</th>
                                <th>게시글</th>
                                <th>날짜</th>
                            </tr>
                            {
                    usersPost.map((el,index)=>{                         
                                return(
                                    <tr key={index}>
                                        <td><input type="checkbox" 
                                        onChange={(e)=> getPostCheckboxId(e, el.id)} /></td>
                                        <td>{el.userName}</td>
                                        <td>{el.title}</td>
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
                                <th></th>
                                <th>순번</th>
                                <th>이름</th>
                                <th>댓글</th>
                            </tr>
                            {
                    userCommentData.map((el,index)=>{                         
                                return(
                                    <tr key={index}>
                                        <td><input type="checkbox"
                                        onChange={(e)=> getCommentCheckboxId(e, el.id)} /></td>
                                        <td>{index}</td>
                                        <td>{el.name}</td>
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