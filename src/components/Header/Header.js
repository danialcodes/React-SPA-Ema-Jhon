import React from 'react';
import logo from "../../images/logo.png";
import './Header.css';
import { NavLink, } from 'react-router-dom'
// import useFirebase from '../../hooks/useFirebase';
import useAuth from '../../hooks/useAuth';
const Header = () => {
    const { user, LogOut } = useAuth();
    return (
        <div className='header'>
            <NavLink to="/"> <img src={logo} className='logo' alt="" /></NavLink>
            <nav>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Orders Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                {
                    user.email?<NavLink to="/myorders">My Orders</NavLink>:<></>
                }
                {user.uid ?
                <><span style={{color:'white'}}>Hello {user.email}</span>
                        <button style={{margin:'0 10px'}}  onClick={LogOut}>Log Out</button></> :
                    <><NavLink
                        to="/login">Login</NavLink>
                        <NavLink to="/signup">SignUp</NavLink></>

                }



            </nav>
        </div>
    );
};

export default Header;