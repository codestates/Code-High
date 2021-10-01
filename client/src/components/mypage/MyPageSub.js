import React, { useState, useEffect } from 'react';
import profileImg from '../../images/profileimg.png'
import moveCodeStorageImg from '../../images/mypageimg.svg'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import ModifyUser from '../basic/modal/ModifyUser';
import modifyUserInfoImg from '../../images/modifyuserinfo.png'
import { getMypageInfo } from '../../redux/actions/userActions';

const MyPageSub = (props) => {
    const userState = useSelector((state) => state.userReducer);
    const { mypageInfo, userInfo } = userState;
    const dispatch = useDispatch();
   
    const [showUserInfoPopUp, setShowUserInfoPopUp] = useState(false);
    const userInfoPopUp = () => {
        setShowUserInfoPopUp(!showUserInfoPopUp)
        console.log(showUserInfoPopUp, 'click')
    };

    useEffect(() => {
        const data = {
          accessToken: userInfo ? userInfo.accessToken : undefined,
        };
        dispatch(getMypageInfo(data));
    }, []);    

    console.log(mypageInfo)

    // console.log('마이페이지 유저정보',userInfo)
    const { onClickHandle } = props;
    return (
        <div className="mypage">
        <div className="mypage-container">
            <div className='mypage-left-container'>
                <div>
                    <img src={profileImg} alt='profile' />
                </div>
                <div className='userinfo-name'>{userInfo.name}</div>
                <div className='userinfo-email'>{userInfo.email}</div>
                <div className='modify-userinfo' onClick={userInfoPopUp}>
                    <img className='modify-userinfo-img' src={modifyUserInfoImg} alt='modifty-userinfo'/>
                    회원정보수정
                </div>
            </div>
            <div className="mypage-right-container">
                <div className="remaincodenotice">
                    현재 복습하셔야 할 코드가 남았습니다.        
                </div>
                <div className="mypage-right-midlle-container">
                    <div className="mypage-right-middle-box-1">
                            <div>
                                <span>
                                    작성한 코드
                                </span>
                                <span className='mypage-number'>
                                    {mypageInfo.postCnt}
                                </span>
                            </div>
                            <div>
                                <span>
                                    댓글
                                </span>
                                <span className='mypage-number'>
                                    {mypageInfo.commentCnt}
                                </span>
                            </div>
                            <div>
                                <span>
                                    이해한 코드
                                </span>
                                <span className='mypage-number'>
                                    {mypageInfo.highCompCnt}
                                </span>
                            </div>
                    </div>
                    <div className='mypage-right-middle-box-2' onClick={onClickHandle} >
                    <Link to='/codestorage'>
                        <img className='mypage-move-codestorage' src={moveCodeStorageImg} alt='moveCodeStorage'/>
                    </Link>
                        <div className='mypage-move-codestorage-text'>
                            코드 저장소 <br/> 이동하기
                        </div>
                    </div>
                </div>
                <div className='mypage-right-bottom-container'>
                </div>
            </div>
        </div>
        {showUserInfoPopUp ? (
            <ModifyUser
                userInfoPopUp={userInfoPopUp}
                setShowUserInfoPopUp={setShowUserInfoPopUp}
            />
        ) : null}
        </div>
    );
};

export default MyPageSub;