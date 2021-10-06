import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';
import SignIn from '../modal/SignIn';
import SideBar from '../navbar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser } from '../../../redux/actions/userActions';
import { resetPostCommet } from '../../../redux/actions/codePostActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import profileImg from '../../../images/profileimg.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { resetCodereviewPost } from '../../../redux/actions/codePostActions';

const NavBar = () => {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const showSidebar = () => setOpenSidebar(!openSidebar);

  const togglePopUp = () => {
    setShowLoginModal(!showLoginModal);
  };

  const handleLogout = () => {
    dispatch(signoutUser());
    dispatch(resetPostCommet());
    history.push('/');
  };

  const handleGoMypage = () => {
    history.push('/mypage');
  };

  return (
    <>
      <div className='navbar'>
        <div className='navbar-container'>
          <div className='navbar-logo-container'>
            <Link to='/'>
              <img src={Logo} alt='logo' />
            </Link>
          </div>

          <ul className='navbar-right'>
            {userInfo ? (
              userInfo === 401 || userInfo === 404 ? (
                <li className='login-tag' onClick={togglePopUp}>
                  LOGIN
                </li>
              ) : userInfo.image === null || userInfo.image === '' ? (
                <>
                  <li className='login-tag'>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='navbar-default-userimg'
                      onClick={handleGoMypage}
                    />
                  </li>
                  <li className='login-tag' onClick={handleLogout}>
                    LOGOUT
                  </li>
                </>
              ) : (
                <>
                  <li className='login-tag'>
                    <img
                      src={userInfo.image}
                      alt='userImage'
                      onClick={handleGoMypage}
                      className='navbar-userimg'
                    />
                  </li>
                  <li className='login-tag' onClick={handleLogout}>
                    LOGOUT
                  </li>
                </>
              )
            ) : (
              <li className='login-tag' onClick={togglePopUp}>
                LOGIN
              </li>
            )}
            <li className='navbar-menubar-sidebar-container'>
              <FontAwesomeIcon
                icon={faBars}
                className='hamburger-menubar'
                src={HamburgerMenubar}
                alt='menubar'
                onClick={showSidebar}
              />
              <span
                className={openSidebar ? 'navbar-menu active' : 'navbar-menu'}
              >
                <SideBar setOpenSidebar={setOpenSidebar} />
              </span>
            </li>
          </ul>
        </div>
        {showLoginModal ? (
          <SignIn
            togglePopUp={togglePopUp}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
          />
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
