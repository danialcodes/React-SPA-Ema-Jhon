import React from 'react';
import logo from "../../images/logo.png";
import './Header.css';
import { NavLink, } from 'react-router-dom'
const Header = () => {
    return (
        <div className='header'>
            <NavLink to="/"> <img src={logo} className='logo' alt="" /></NavLink>
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Orders Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>

            </nav>
        </div>
    );
};

export default Header;