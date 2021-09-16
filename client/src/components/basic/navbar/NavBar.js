import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';
import SideBar from './SideBar';

const NavBar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const showSidebar = () => setOpenSidebar(!openSidebar);


  return (
    <>
      <div className='navbar'>
        <div className='navbar-container'>

          <div className='navbar-logo-container'>
          <Link to='/'><img src={Logo} alt='logo'/></Link>
          </div>

          <ul className='navbar-right'>
            <li className='login-tag'>Login</li>
            <li className='navbar-menubar-sidebar-container'>
              <img
                className='hamburger-menubar'
                src={HamburgerMenubar}
                alt='menubar'
                onClick={showSidebar}
              />
              <span className={openSidebar? 'navbar-menu active' : 'navbar-menu'}>
                <SideBar />
              </span>

            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
