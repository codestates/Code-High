import React from 'react';
import profileImg from '../../images/profileimg.png'
import moveCodeStorageImg from '../../images/mypageimg.svg'


const MyPageSub = () => {
    return (
        <div className="mypage-container">
            <div className='mypage-left-container'>
                <div>
                    <img src={profileImg} alt='profile' />
                </div>
                <div>김코딩</div>
                <div>example@example.com</div>
                <div>회원정보수정</div>
            </div>
            <div className="mypage-right-container">
                <div className="remaincodenotice">
                    현재 복습하셔야 할 코드가 남았습니다.        
                </div>
                <div className="mypage-right-midlle-container">
                    <div className="mypage-right-middle-box">
                        <div>
                            <span>
                                작성한 코드
                            </span>
                            <span className='mypage-number'>
                                11
                            </span>
                        </div>
                        <div>
                            <span>
                                댓글
                            </span>
                            <span className='mypage-number'>
                                3
                            </span>
                        </div>
                        <div>
                            <span>
                                리뷰수
                            </span>
                            <span className='mypage-number'>
                                1
                            </span>
                        </div>
                    </div>
                    <div className='mypage-right-middle-box-2'>
                        <img className='mypage-move-codestorage' src={moveCodeStorageImg} alt='moveCodeStorage'/>
                        <div className='mypage-move-codestorage-text'>
                            코드 저장소 <br/> 이동하기
                        </div>
                    </div>
                </div>
                <div className='mypage-right-bottom-container'>
                </div>
            </div>
        </div>
    );
};

export default MyPageSub;