import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='sidebar-main'>
          <ul className='sidebar-menutab-container'>
            <li>
              <Link to='codestorage'>코드 저장소</Link>
            </li>
            <li>
              <Link to='codereview'>코드 리뷰</Link>
            </li>
            <li>
              <Link to='mypage'>마이 페이지</Link>
            </li>
            <li>
              <Link to='userinfo'>사용자 현황</Link>
            </li>
            <li>
              <Link to='postmanagement'>게시글 현황 및 관리</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
