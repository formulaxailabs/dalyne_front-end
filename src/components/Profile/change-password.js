import React, {useState} from 'react';
import {callApi} from '../../helper/api';
import {success as notifySuccess} from '../../helper/notify';
import './profile.css';

export default function ChangePassword() {
	let [old_password, setold_password] = useState('');
    let [new_password, setnew_password] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    let defaultErrors	=	{
        old_password: '',
        new_password: '',
        confirm_password:''
	}
	let [errors, setErrors]	= useState({...defaultErrors});
    let [isProcessing, setProcessing] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
			let isError	=   validate();
			if(!!isError) {
				return false;
            }
            let data = {
                old_password:old_password,
                new_password:new_password
            }
            setProcessing(true);
            const payload = await callApi('POST', '/change/password/', data);
            if(payload.data) {
                setProcessing(false);
                let result          =   payload.data || {};
                notifySuccess({message: result.msg});
                setold_password('');
                setnew_password('');
                setConfirmPassword('');
            } else {
                setProcessing(false);
            }
        } catch(e) {
            setProcessing(false);
            //console.log(e, e.response, 11)
            if(e.response) {
                let response    =   e.response || {};                
                let data    =  response.data || {};
                let err = {...defaultErrors};
                Object.keys(data).map(key => {
                    return err[key] = data[key];
                })
                setErrors(err);
            }
        }
    }

	const validate = () => {
		let err		=	{...defaultErrors};
		let isError	=	false;
		if(!!!old_password) {
			err.old_password	=	'Please enter your old password';
			isError	=	true;
        }
        if(!!!new_password) {
			err.new_password	=	'Please enter password';
			isError	=	true;
		}
		if(!!!confirmPassword) {
			err.confirmPassword	=	'Please enter confirm password';
			isError	=	true;
		}
		if(!!new_password && !!confirmPassword && new_password !== confirmPassword) {
            err.confirmPassword	=	'Passwords are not same';
			isError	=	true;
		}
		setErrors(err);
		return isError;
    }

    return (
    <main className="main-container">

        <div className="heading-bar">
            <div className="row">
                <div className="col-12">
                    <h2>Change Password</h2>
                </div>
            </div>
        </div>

        <div className="main-body profile-body">
            <div className="row">
                <div className="col-12">
                    <div className="box p-4">
                        <div className="row">
                            <div className="col-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="fld-group">
                                        <label>Old Password</label>
                                        <input 
                                            type="password" 
                                            name="old_password" 
                                            onChange={(e) => {setold_password(e.target.value)}} 
                                            defaultValue="" 
                                            className={`fld slow${!!errors.old_password ? ' error' : ''}`}
                                            placeholder="Enter Old Password*"
                                        />
                                        <p className={`invalid ${!!errors.old_password ? 'd-block' : ''}`}>{errors.old_password}</p>
                                    </div>
                                    <div className="fld-group">
                                        <label>New Password</label>
                                        <input 
                                            type="password" 
                                            name="new_password" 
                                            onChange={(e) => {setnew_password(e.target.value)}} 
                                            defaultValue="" 
                                            className={`fld slow${!!errors.new_password ? 'error':''}`} 
                                            placeholder="New Password*"
                                        />
                                        {
                                            !!errors.new_password ? 
                                            <p className={`invalid ${!!errors.new_password ? 'd-block' : ''}`}>{(typeof errors.new_password == 'string')?errors.new_password:(errors.new_password || []).map(item => (<p className="fld-alert d-block">{item}</p>))}</p>
                                            : null
                                        }
                                    </div>
                                    <div className="fld-group">
                                        <label>Confirm Password</label>
                                        <input 
                                            type="password"   
                                            name="confirmPassword" 
                                            onChange={(e) => {setConfirmPassword(e.target.value)}} 
                                            defaultValue="" 
                                            className={`fld slow${!!errors.confirmPassword ? 'error':''}`} 
                                            placeholder="Re Enter Password*"
                                        />
                                        <p className={`invalid ${!!errors.confirmPassword ? 'd-block' : ''}`}>{errors.confirmPassword}</p>
                                    </div>
                                    <div className="btn-area">
                                        <button className="btn mb-3">{(!!isProcessing) ? 'Processing..' : 'Change Password'}</button>
                                    </div> 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </main>
  );
}
