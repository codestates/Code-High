import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';
import SignIn from '../modal/SignIn';
import SideBar from '../navbar/SideBar';

const NavBar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const showSidebar = () => setOpenSidebar(!openSidebar);

  //! modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const togglePopUp = () => {
    setShowLoginModal(!showLoginModal);
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
            <li className='login-tag' onClick={togglePopUp}>
              Login
            </li>
            <li className='navbar-menubar-sidebar-container'>
              <img
                className='hamburger-menubar'
                src={HamburgerMenubar}
                alt='menubar'
                onClick={showSidebar}
              />
              <span className={openSidebar ? 'navbar-menu active' : 'navbar-menu'}>
                <SideBar />
              </span>
            </li>
          </ul>
        </div>
        {showLoginModal
          ? (
            <SignIn
              togglePopUp={togglePopUp}
              setShowLoginModal={setShowLoginModal}
            />
            )
          : null}
      </div>
    </>
  );
};

export default NavBar;
