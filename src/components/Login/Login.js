import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// import useFirebase from '../../hooks/useFirebase';

const Login = () => {
    const { sendOtp, signInWithGoogle, signInWithGithub } = useAuth();
    const location = useLocation();
    const redirect_url = location.state?.from || '/';
    const history = useHistory();
    // console.log(history, location);
    const google = () => {
        const [sgngol, setUser] = signInWithGoogle();
        sgngol.then(result => {
            setUser(result.user);
            history.push(redirect_url);
        })
    }
    return (
        <div className="text-center">
            <div id="recapta-container"></div>
            <div>
                <h2>Login</h2>
                <form>
                    <input type="email" name="" id="email" placeholder="Email" />
                    <br />
                    <input type="password" name="" id="password" placeholder="Password" />
                    <br />
                    <input type="submit" value="Login" />
                </form>
                <p>New to ema-jhon?
                    <Link to="/signup">
                        Become a member
                    </Link>
                </p>
                <br />
                <button
                    onClick={google}
                    className="btn-regular">Google Sign In</button>
                <button onClick={signInWithGithub} className="btn-regular">GitHub Sign In</button>
                <button onClick={sendOtp} className="btn-regular">Phone Sign In</button>
            </div>
        </div>
    );
};

export default Login;