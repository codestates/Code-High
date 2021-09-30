import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = ({ setOpenSidebar }) => {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  const SideBarBackgroundEl = useRef(null);

  const handleCloseAuto = () => {
    setOpenSidebar(false);
  };

  const SideBarBackgroundClick = (e) => {
    if (e.target === SideBarBackgroundEl.current) {
      setOpenSidebar(false);
    }
  };

  return (
    <div
      className='sidebar'
      onClick={(e) => SideBarBackgroundClick(e)}
      ref={SideBarBackgroundEl}
    >
      <div className='sidebar-container'>
        <div className='sidebar-main'>
          <ul className='sidebar-menutab-container'>
            <li onClick={handleCloseAuto}>
              <Link to='codestorage'>코드 저장소</Link>
            </li>
            <li onClick={handleCloseAuto}>
              <Link to='codereview'>코드 리뷰</Link>
            </li>
            <li onClick={handleCloseAuto}>
              <Link to='mypage'>마이 페이지</Link>
            </li>
            {userInfo.authorityId === 1 
              ? <><li onClick={handleCloseAuto}>
              <Link to='admingraph'>사용자 현황</Link>
            </li>
            <li onClick={handleCloseAuto}>
              <Link to='admintable'>게시글 현황 및 관리</Link>
            </li></>
            : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
