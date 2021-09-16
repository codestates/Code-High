import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';

const NavBar = () => {
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const showSidebar = () => setOpenSidebar(!OpenSidebar);

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
              {OpenSidebar ? <Sidebar /> : <></>}
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
