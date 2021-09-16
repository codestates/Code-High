import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';
import Signin from '../modal/Signin';
import SideBar from '../navbar/SideBar';

const NavBar = () => {
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const showSidebar = () => setOpenSidebar(!OpenSidebar);

  //!modal
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
              {OpenSidebar ? <SideBar /> : <></>}
            </li>
          </ul>
        </div>
        {showLoginModal ? (
          <Signin
            togglePopUp={togglePopUp}
            setShowLoginModal={setShowLoginModal}
          />
        ) : null}
      </div>
    </>
  );
};

export default NavBar;
