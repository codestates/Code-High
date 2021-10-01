import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

const SideBar = () => {
  return (
    // <div className='sidebar'>
    //   <div className='sidebar-container'>
    //     <div className='menutab-container'>
    //       <Link to='codestorage'>
    //       <ul>코드 저장소</ul>
    //       </Link>
    //       <Link to='codereview'>
    //       <ul>코드 리뷰</ul>
    //       </Link>
    //       <Link to='mypage'>
    //       <ul>마이 페이지</ul>
    //       </Link>
    //       <Link to='userinfo'>
    //       <ul>사용자 현황</ul>
    //       </Link>
    //       <Link to='postmanagement'>
    //       <ul>게시글 현황 및 관리</ul>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='menutab-container'>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.classname}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
