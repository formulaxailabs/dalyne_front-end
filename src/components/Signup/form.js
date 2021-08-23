import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom';
import { notify } from 'react-notify-toast';
import { useHistory } from 'react-router-dom';
import {callApi} from '../../helper/api';
import { catchErrorHandler, isValidEmail, isValidMobile } from '../../helper/common';
import {error as notifyError, success as notifySuccess} from '../../helper/notify';
import userContext from '../../user-context';
//import RZP from './rzp';

export default function SignupForm(props) {
    let history	= useHistory();
    let [company_name, setCompanyName] = useState('');
    let [firstname, setFirstName] = useState('');
    let [lastname, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [otp, setOtp] = useState('');
    let [phone_no, setPhoneNo] = useState('');
    let [password, setPassword] = useState('');
    let [isProcessing, setProcessing] = useState(false);
    let [isOtpProcessing, setOtpProcessing] = useState(false);
    let {userData, updateUserData} = useContext(userContext);
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    let defaultErrors = {
        firstname: false,
        lastname: false,
        phone: false,
        email: false,
        company_name: false,
        password: false
    }

    const getEmailOtp = async (e) => {
        e.preventDefault();
        try{
            /* let isError		=	validate();
			if(!!isError) {
				return false;
            } */
            
            setOtpProcessing(true);
            const payload = await callApi('POST', `/send/otp/`, {
                email: email
            });
            if(payload.data) {
                setOtpProcessing(false);
                let result          =   payload.data || {};
                //setUserId(result.user);
                notifySuccess({message: 'OTP sent to your email'})
            } else {
                setOtpProcessing(false);
                //notifyError({message: 'Invalid username or password'});
            }
        } catch(e) {
            setOtpProcessing(false);
            /* if(e.response) {
                let response    =   e.response || {};                
                let data    =  response.data || {};
                let err = {...defaultErrors};
                Object.keys(data).map(key => {
                    return err[key] = data[key];
                })
                setErrors(err);
            } */
            //catchErrorHandler(err);
        }
    }

    const emailVerify = async (e) => {
        e.preventDefault();
        try{
            /* let isError		=	validate();
			if(!!isError) {
				return false;
            } */
            
            setOtpProcessing(true);
            const payload = await callApi('POST', `/verify/otp/`, {
                email: email
            });
            if(payload.data) {
                setOtpProcessing(false);
                let result          =   payload.data || {};
                //setUserId(result.user);
                //notifySuccess({message: 'OTP sent to your email'})
            } else {
                setOtpProcessing(false);
                //notifyError({message: 'Invalid username or password'});
            }
        } catch(e) {
            setOtpProcessing(false);
            /* if(e.response) {
                let response    =   e.response || {};                
                let data    =  response.data || {};
                let err = {...defaultErrors};
                Object.keys(data).map(key => {
                    return err[key] = data[key];
                })
                setErrors(err);
            } */
            //catchErrorHandler(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //setProcessing(true);
            if(!!props.plans.planAmount && props.plans.planAmount > 0){
                createOrder();
            }else{
                callSignupApi()
            }
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    };

    const createOrder = async () => {
        try{
            const payload = await callApi('POST', `/create/order/`, {
                plan_id : props.plans.planId,
                cost : props.plans.planAmount
            });
            if(payload.data) {
                let result =  payload.data;
                let orderData = result.order_data;
                let orderId = orderData.order_id;
                callRazorpay(orderId)
                //console.log(orderData.order_id, 'result')
            }            
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    };

    const callRazorpay = (oId) => {
        try {
            //console.log('orderId', oId)
            const razorPayData = {
                key: 'rzp_test_cSVPcKd5oNyHFJ',
                amount: props.plans.planAmount*100, //  = INR 1
                name: props.plans.planName,
                description: company_name,
                image: '/images/rzp-logo.png',
                order_id: oId,
                handler: function(response) {
                    const paySucRes = response;
                    const data = {
                        razorpay_payment_id : paySucRes.razorpay_payment_id,
                        razorpay_signature : paySucRes.razorpay_signature,
                        razorpay_order_id : paySucRes.razorpay_order_id
                    }
                    //callSignupApi();
                    capturePayment(data);
                    //console.log(response, '=========', data, 'response.razorpay_payment_id');
                },
                prefill: {
                    name: firstname + ' ' + lastname,
                    contact: phone_no,
                    email: email
                },
                notes: {
                    address: ''
                },
                theme: {
                    color: 'blue',
                    hide_topbar: false
                }
            };
            openPayModal(razorPayData);
                        
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    }

    const capturePayment = async (data) => {
        try{
            const payload = await callApi('POST', `/capture/payment/`, data);
            if(payload.data) {
                let result =  payload.data;
                notifySuccess({message: result.msg})
                //console.log(result, 'capturePayment')
                callSignupApi()
            }
        } catch(err) {
            setProcessing(false);
            //catchErrorHandler(err);
        }
    };

    const openPayModal = (razorPayData) => {
        var rzp1 = new window.Razorpay(razorPayData);
        rzp1.open();
    };

    const callSignupApi = async () => {
        try{
            const signupData = {
                company_name: company_name,
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone_no: phone_no,
                password: password,
                plans: props.plans.planId
            }
            //console.log(signupData, 'signupData')
            const payload = await callApi('POST', `/signup/`, signupData);
            if(payload.data) {
                setProcessing(false);
                let result =  payload.data;
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
            }
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    };

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
    let {isError, errors} = validate();

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
                <div className="fld_row mb-2">
                    <span className="icon"><i className="fas fa-envelope" aria-hidden="true"></i></span>
                    <input className={`fld slow${!!errors.email ? ' error' : ''}`} type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="off" />
                </div>
                {/* <div className="fld_row mb-2">
                    <span className="icon"><i class="far fa-keyboard" aria-hidden="true"></i></span>
                    <input className={`fld slow`} type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter Otp" autoComplete="off" />
                </div>
                <div className="fld_row otp-row">
                    <button onClick={getEmailOtp} className="btn otp_btn slow" type="button">{!!isOtpProcessing ? 'Processing...' : 'Get OTP'}</button>
                    <button onClick={emailVerify} className="btn otp_btn slow" type="button">{!!isOtpProcessing ? 'Processing...' : 'Verify Email'}</button>
                </div> */}
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