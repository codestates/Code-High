import React from 'react';
import logo from '../../../images/codehighlogo.png'

const NavBar = () => {
    return (
        <div>
            <div className="navbar-logo">
                <img src="logo" alt="logo"></img>
            </div>
            <div>
                <div>
                    Login
                </div>
                <div>
                    Menu
                </div>
            </div>           
        </div>
    );
};

export default NavBar;