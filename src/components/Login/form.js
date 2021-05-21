import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { useHistory } from 'react-router-dom';
import {callApi} from '../../helper/api';
import { catchErrorHandler } from '../../helper/common';
import {error as notifyError, success as notifySuccess} from '../../helper/notify';
import userContext from '../../user-context';

export default function LoginForm(props) {
    let history			=	useHistory();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [isProcessing, setProcessing] = useState(false);
    let {userData, updateUserData} = useContext(userContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setProcessing(true);
            //const payload = await callApi('POST', `users/login/`, {email: email, password: password });
            const payload = await callApi('POST', `users/login/`, {email: 'abhisek.singh@formulaxai.com', password: 'demo@123' });
            /* if (payload.data.error) {
                console.log(payload.data.error);
                notifyError(payload.data.error)
            }
            else { */
            if(payload.data) {
                setProcessing(false);
                let result          =   payload.data || {};
                notifySuccess({message: 'Login Successfully'})
                let user            =   {
                    ...result.user_details,
                    token: result.token,
                    token_expiry: result.token_expiry
                }
                updateUserData(user);
                history.push('/dashboard');
            } else {
                setProcessing(false);
                notifyError({message: 'Invalid username or password'});
            }
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="fld_row">
                    <span className="icon"><i className="fas fa-envelope" aria-hidden="true"></i></span>
                    <input className="fld slow" type="text" name="email" onChange={(e) => setEmail(e.target.value)} defaultValue="" placeholder="Email address" autoComplete="off" />
                </div>
                <div className="fld_row mb-1">	
                    <span className="icon"><i className="fas fa-lock" aria-hidden="true"></i></span>
                    <input className="fld slow" type="password" name="password" onChange={(e) => setPassword(e.target.value)} defaultValue="" placeholder="Password" autoComplete="off" />
                </div>			
                <div className="clear"></div> 
                <div className="strip">           
                    <span className="imp">
                        {/* onClick={() => setRememberMe(!rememberme)} checked={rememberme} */}
                        <label htmlFor="remember">
                            <input type="checkbox" id="remember" /> Remember Me
                        </label>
                    </span>
                    <span className="imp">
                        <a href="#" className="forgt_pw slow">Forgot Password ?</a>
                    </span>
                </div>
                <div className="btn_body">
                    <button className="btn login_btn slow" type="submit">{(!!isProcessing) ? 'Processing ..' : 'Login'}</button>
                    <p className="signup mt-3">
                        Not a member ? &nbsp;
                        <Link to="/signup" className="slow">Sign Up</Link>
                    </p>
                </div>
            </form>
        </>
    )
}