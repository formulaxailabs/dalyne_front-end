import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { useHistory } from 'react-router-dom';
import {callApi} from '../../helper/api';
import { catchErrorHandler, isValidEmail, isValidMobile } from '../../helper/common';
import {error as notifyError, success as notifySuccess} from '../../helper/notify';
import userContext from '../../user-context';

export default function SignupForm(props) {
    let history			=	useHistory();    
    
    let [company_name, setCompanyName] = useState('');
    let [firstname, setFirstName] = useState('');
    let [lastname, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [phone_no, setPhoneNo] = useState('');
    let [password, setPassword] = useState('');

    let [isProcessing, setProcessing] = useState(false);
    let {userData, updateUserData} = useContext(userContext);
    
    let defaultErrors = {
        firstname: false,
        lastname: false,
        phone: false,
        email: false,
        company_name: false,
        password: false
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setProcessing(true);
            const payload = await callApi('POST', `/signup/`, {
                company_name: company_name,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone_no: phone_no,
                password: password,
                plans: props.plans
            });
            if(payload.data) {
                setProcessing(false);
                let result          =   payload.data;
                setCompanyName('');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNo('');
                setPassword('');
                notifySuccess({message: 'Registered Successfully'})
                history.push('/');
            } else {
                setProcessing(false);
                //notifyError({message: 'Invalid username or password'});
            }
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    }

    const validate  = ()  =>  {
        let errors  = {...defaultErrors};
        let isError = false;
        if(!!!firstname) {
          errors.firstname = true;
          isError     = true;
        }
        if(!!!lastname) {
          errors.lastname = true;
          isError     = true;
        }
        if(!!!phone_no) {
          errors.phone_no = true;
          isError     = true;
        }
        if(!!phone_no && !isValidMobile(phone_no)) {
          errors.phone_no = true;
          isError     = true;
        }
        if(!!!email) {
          errors.email = true;
          isError     = true;
        }
        if(!!email && !isValidEmail(email)) {
          errors.email = true;
          isError     = true;
        }
        if(!!!password) {
          errors.password = true;
          isError     = true;
        }
        if(!!!company_name) {
          errors.company_name = true;
          isError     = true;
        }
        return {errors, isError};
    }

    let {isError, errors}   = validate();
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="fld_row">
                    <span className="icon"><i className="fas fa-user" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.firstname ? ' error' : ''}`} type="text" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" autoComplete="off" />
                </div>
                <div className="fld_row">	
                    <span className="icon"><i className="fas fa-user" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.lastname ? ' error' : ''}`} type="text" name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" autoComplete="off" />
                </div>
                <div className="fld_row">
                    <span className="icon"><i className="fas fa-envelope" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.email ? ' error' : ''}`} type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="off" />
                </div>
                <div className="fld_row">
                    <span className="icon"><i className="fas fa-mobile" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.phone_no ? ' error' : ''}`} type="number" name="phone_no" value={phone_no} onChange={(e) => setPhoneNo(e.target.value)} placeholder="Contact No" autoComplete="off" />
                </div>
                <div className="fld_row">	
                    <span className="icon"><i className="far fa-building" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.password ? ' error' : ''}`} type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="off" />
                </div>
                <div className="fld_row">	
                    <span className="icon"><i className="far fa-building" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.company_name ? ' error' : ''}`} type="text" name="company_name" value={company_name} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" autoComplete="off" />
                </div>
                {/* <div className="fld_row">
                    <span className="icon"><i className="fas fa-users-cog" aria-hidden="true"></i></span>
                    <select className="fld slow">
                        <option>Select Sales Executive</option>
                        <option>Tia</option>
                        <option>Marry</option>
                        <option>Steve</option>
                    </select>
                </div> */}
                <div className="clear"></div>
                <div className="btn_body">
                    <button className="btn login_btn slow" type="submit" disabled={!!isError || !!isProcessing}>{(!!isProcessing) ? 'Processing ..' : 'Register'}</button>
                    <p className="signup mt-3">Already Register ? &nbsp; 
                        <Link to="/login" className="slow">Login</Link>
                    </p>
                </div>
            </form>
        </>
    )
}