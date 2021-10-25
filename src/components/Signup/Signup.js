import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Signup = () => {
    const {signUpWithEmailPass} = useAuth();
    return (
        <div className="text-center">
            <div>
                <h2>SignUp</h2>
                <form onSubmit={()=>{signUpWithEmailPass()}}>
                    <input type="email" name="" id="email" placeholder="Email" />
                    <br />
                    <input type="password" name="" id="password" placeholder="Password" />
                    <br />
                    <input type="password" name="" id="password2" placeholder="ReEnter password" />
                    <br />
                    <input type="submit" value="SignUp" />
                </form>
                <p>Already Member?  
                    <Link to="/login">
                        Login
                    </Link>
                </p>
                <br />
                <button className="btn-regular">Google Sign Up</button>
                <button className="btn-regular">GitHub Sign Up</button>
                <button className="btn-regular">Phone Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;