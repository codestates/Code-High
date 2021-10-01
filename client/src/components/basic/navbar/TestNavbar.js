import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../images/codehighlogo.png';
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg';
import SignIn from '../modal/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { signoutUser } from '../../../redux/actions/userActions';
import TestSidebar from './TestSidebar';

const TestNavbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const state = useSelector((state) => state.userReducer);
  
  const { userInfo } = state;
  const dispatch = useDispatch();
  
  const showSidebar = () => setOpenSidebar(!openSidebar);
  //! modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const togglePopUp = () => {
    setShowLoginModal(!showLoginModal);
  };
  const handleLogout = () => {
    dispatch(signoutUser())
  }

  return (
    <>
      <div>
        <div className='navbar'>
          <div className='navbar-container'>
            <div className='navbar-logo-container'>
              <Link to='/'>
                <img src={Logo} alt='logo' />
              </Link>
            </div>

            <ul className='navbar-right'>
              {userInfo ? 
              (<li className='login-tag' onClick={handleLogout}>Logout</li>) : 
              (<li className='login-tag' onClick={togglePopUp}>Login</li>)}
              <li className='navbar-menubar-sidebar-container'>
                <nav>
                <img
                  className='hamburger-menubar'
                  src={HamburgerMenubar}
                  alt='menubar'
                  onClick={showSidebar}
                  />
                <span className={openSidebar ? 'navbar-menu active' : 'navbar-menu'}>
                  <TestSidebar />
                </span>
                </nav>
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
      </div>
    </>
  )
}

export default TestNavbar
