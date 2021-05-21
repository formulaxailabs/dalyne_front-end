import React, {useState} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler, isValidEmail} from '../../helper/common';

export default function AddUser(props) {
    let [firstname, setFirstName]   =   useState('');
    let [lastname, setLastName]   =   useState('');
    let [email, setEmail]   =   useState('');
    let [isProcessing, setProcessing]   =   useState(false);

    const validate  =   ()  =>  {
        let errors  =   {
            firstname: false,
            lastname: false,
            email: false
        }
        let isError         =   false;
        if(!!!firstname) {
            errors.firstname    =   true;
            isError             =   true;
        }
        if(!!!lastname) {
            errors.firstname    =   true;
            isError             =   true;
        }
        if(!!!email) {
            errors.firstname    =   true;
            isError             =   true;
        }
        if(!!email && !isValidEmail(email)) {
            errors.firstname    =   true;
            isError             =   true;
        }
        return {isError: isError, errors: errors};
    }

    const handleSubmit  = async (e)  =>  {
        try{
            e.preventDefault();
            setProcessing(true);
            const payload = await callApi('POST', `user/create/`, {
                email       :   email,
                firstname   :   firstname,
                lastname    :   lastname
            });
            if(payload.data.result) {
                setProcessing(false);
                props.setAddUserModal(!props.addUserModal);
                props.onSuccess(true);
            } else {
                setProcessing(false);
            }
        } catch(err) {
            setProcessing(false);
            catchErrorHandler(err);
        }
    }

    let {isError, errors}   =   validate();
    return (
        <div className="popup-body">
            <div className="popup-box micro">
                <div className="pop-close" onClick={() => props.setAddUserModal(!props.addUserModal)}>
                    <span className="fas fa-times icon"></span>
                </div>
                <div className="pop-header">
                    <h5>Add User</h5>
                </div>
                <section className="content-area">
                    <form onSubmit={handleSubmit}>
                        <div className="add-form">
                            <div className="row">
                                {/* <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Tenant</label>
                                        <select className="fld drp-fld">
                                            <option value="">Select Tenant</option>
                                            <option value="Female">Tenant1</option>
                                            <option value="Other">Tenant2</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>First Name</label>
                                        <input name="firstname" value={firstname} type="text" onChange={(e) => setFirstName(e.target.value)} className={`fld${errors.firstname ? ' error' : ''}`} />
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Gender</label>
                                        <select className="fld drp-fld">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div> */}                            
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Last Name</label>
                                        <input name="ename" value={lastname} type="text" onChange={(e) => setLastName(e.target.value)} className={`fld${errors.lastname ? ' error' : ''}`} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Email Address</label>
                                        <input name="eemail" value={email} type="text" onChange={(e) => setEmail(e.target.value)} className={`fld${errors.email ? ' error' : ''}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <div className="btn-group">
                                        <button onClick={() => props.setAddUserModal(!props.addUserModal)} className="default-btn reset-btn slow" type="button">
                                            Cancel
                                        </button>
                                        <button disabled={isError || isProcessing} className="default-btn slow" type="submit">
                                            {isProcessing ? 'Processing ..' : 'Add User'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
