import React, {useEffect, useState} from 'react';
import {callApi} from '../../helper/api';
import {catchErrorHandler, isValidEmail} from '../../helper/common';

export default function EditUser(props) {
    let [firstname, setFirstName]   =   useState('');
    let [lastname, setLastName]   =   useState('');
    let [email, setEmail]   =   useState('');
    let [isProcessing, setProcessing]   =   useState(false);

    useEffect(() => {
        let details =   props.details || {};
        setFirstName(details.firstname)
        setLastName(details.lastname)
        setEmail(details.user__email)
    }, [props.details])

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
            let data    =   {
                email       :   email || '',
                firstname   :   firstname || '',
                lastname    :   lastname || ''
            };
            const payload = await callApi('PUT', `user/update/?user_id=${props.details.user__id}`, data);
            if(payload.data.result) {
                setProcessing(false);
                props.setEditUserModal(!props.editUserModal);
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
                <div className="pop-close" onClick={() => props.setEditUserModal(!props.editUserModal)}>
                    <span className="fas fa-times icon"></span>
                </div>
                <div className="pop-header">
                    <h5>Edit User</h5>
                </div>
                <section className="content-area">
                    <form onSubmit={handleSubmit}>
                        <div className="add-form">
                            <div className="row">
                                {/* <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Tenant</label>
                                        <select className="fld drp-fld">
                                            <option value="Tenant1">Tenant1</option>
                                            <option value="Female">Tenant1</option>
                                            <option value="Other">Tenant2</option>
                                        </select>
                                    </div>
                                </div> */}
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>First Name</label>
                                        <input name="firstname" defaultValue={firstname} type="text" onChange={(e) => setFirstName(e.target.value)} className={`fld${errors.firstname ? ' error' : ''}`} />
                                    </div>
                                </div>                            
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Last Name</label>
                                        <input name="ename" defaultValue={lastname} type="text" onChange={(e) => setLastName(e.target.value)} className={`fld${errors.lastname ? ' error' : ''}`} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="fld-group">
                                        <label>Email Address</label>
                                        <input name="eemail" defaultValue={email} type="text" onChange={(e) => setEmail(e.target.value)} className={`fld${errors.email ? ' error' : ''}`} />
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
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <div className="btn-group">
                                        <button onClick={() => props.setEditUserModal(!props.editUserModal)} className="default-btn reset-btn slow" type="button">
                                            Cancel
                                        </button>
                                        <button disabled={isError || isProcessing} className="default-btn slow" type="submit">
                                            {isProcessing ? 'Processing ..' : 'Update User'}
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
