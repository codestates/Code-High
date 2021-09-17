import React from 'react';
import Button from '../basic/button/Button'

const PostComment = () => {
    return (
        <div className='postcomment'>
            <div className='postcomment-input-container'>
                <div className='postcomment-input-title'>댓글</div>
                <div className='postcomment-input-container-text'>
                <div className='postcomment-input-message'>입력하세요:)</div>
                <button className='postcomment-button'>
                    확인
                </button>
                </div>
            </div>
            <div className='postcomment-output-container'>
                <div>
                    <span className="postcomment-name">kimcoding</span><span className='postcomment-date'>2021.09.17</span>
                    <div className="postcomment-message">
                        댓글댓글댓글
                    </div>
                </div>
                <div>
                    <span>수정</span>
                    <span>삭제</span>
                </div>
            </div>
        </div>
    );
};

export default PostComment;