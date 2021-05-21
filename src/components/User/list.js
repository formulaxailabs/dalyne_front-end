import React, {useState, useEffect} from 'react';
import {callApi} from '../../helper/api';
import {error as notifyError, success as notifySuccess} from '../../helper/notify';
import {isEmpty} from 'lodash'
import { catchErrorHandler } from '../../helper/common';

export default function UserList(props) {
    let [isLoading, setLoading] = useState(true);
    let [userList, setUserList] = useState([]);

    useEffect(() => {
        if(props.reload)
            getUserList()
    }, [props.reload])

    const getUserList = async () => {
        try{
            //setLoading(true);
            const payload = await callApi('GET', `user/list/`);
            if(payload.data.result) {
                setLoading(false);
                setUserList(payload.data.result);
                props.onSuccess(false);
            } else {
                setLoading(false);
            }
        } catch(err) {
            setLoading(false);
            catchErrorHandler(err);
        }
    }

    const updateStatus = async (id, status, i) => {
        try{
            const payload = await callApi('PUT', `user/active/deactive/`, {
                user_id:id,
                is_active:status
            });
            if(payload.data.result) {
                let list = [...userList];
                list[i].user__is_active =   status === '1' ? true : false;
                setUserList(list);
                //setUserList(payload.data.result);
                //getUserList();
            } else {
                setLoading(false);
            }
        } catch(err) {
            setLoading(false);
            catchErrorHandler(err);
        }
    }

    const deleteUser = async (id, i) => {
        try{
            if(window.confirm('Do you really want to delete this user?')) {
                const payload = await callApi('PUT', `user/delete/`, {
                    user_id:id
                });
                if(payload.data.result) {
                    let list = [...userList];
                    list.splice(i, 1)
                    setUserList(list);
                } else {
                }
            }
        } catch(err) {
            catchErrorHandler(err);
        }
    }
    

    const resetPass = async (id, i) => {
        try{
            if(window.confirm('Do you really want to reset password?')) {
                const payload = await callApi('PUT', `user/password/reset/`, {
                    user_id:id
                });
                if(payload.data.result) {
                    let result =    payload.data.result || {};
                    notifySuccess({message: result.message});
                } else {
                }
            }
        } catch(err) {
            catchErrorHandler(err);
        }
    }

    return (        
        <div className="tab-details pt-1">
            <div>
                <div className="listing-box">
                    {/* <div className="action-row advance-search">
                        <div className="row">
                            <div className="col-3 pr-0">
                                <div className="fld-group">
                                    <input type="text" className="fld" placeholder="Name" />
                                </div>
                            </div>
                            <div className="col-3 pr-0">
                                <div className="fld-group">
                                    <input type="text" className="fld" placeholder="Email" />
                                </div>
                            </div>
                            <div className="col-3 pr-0">
                                <div className="fld-group">
                                    <input type="text" className="fld" placeholder="Mobile" />
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="text-right">
                                    <button className="default-btn reset-btn slow">Reset</button>
                                    <button className="default-btn slow">Search</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="res-box mt-1">
                        
                        <div className="table-hd-sticky">
                            <table width="100%" border="0">
                                <thead>
                                    <tr className="header-row">
                                        <th>Sl. No.</th>
                                        {/* <th>Tenat</th> */}
                                        <th>Name</th>
                                        {/* <th>Date</th>
                                        <th>Designation</th> */}
                                        <th>Email</th>
                                        {/* <th>Mobile</th> */}
                                        <th className="text-center">Status</th>
                                        {/* <th className="text-center">Action</th> */}
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <table width="100%" border="0">
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Banty</td>
                                    <td>9563735364</td>
                                    <td className="text-center">
                                        <button className="btn-active" title="Click to inactive">Active</button>
                                    </td>
                                    {/* <td className="text-center">
                                        <span className="far fa-edit icon"></span>
                                        <span className="fas fa-key icon"></span>
                                        <span className="far fa-trash-alt icon"></span>
                                    </td> */}
                                </tr>
                                {
                                    !isLoading ? 
                                    userList.length > 0 ?
                                    (userList || []).map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{k+1}</td>
                                                {/* <td>Dinesh</td> */}
                                                <td>{item.firstname} {item.lastname}</td>
                                                {/* <td>12-Mar-2020</td>
                                                <td>Developer</td> */}
                                                <td>-</td>
                                                {/* <td>9563735364</td> */}
                                                <td className="text-center">
                                                    {
                                                        (!!item.user__is_active) ?
                                                        <button className="btn-active" onClick={() => updateStatus(item.user__id, '0', k)} title="Click to inactive">Active</button>
                                                        : <button className="btn-inactive" onClick={() => updateStatus(item.user__id, '1', k)} title="click to active">Inactive</button>
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    <span onClick={() => props.editUser(!props.editUserModal, {...item, index: k})} className="far fa-edit icon"></span>
                                                    <span onClick={() => resetPass(item.user__id)} className="fas fa-key icon"></span>
                                                    <span onClick={() => deleteUser(item.user__id, k)} className="far fa-trash-alt icon"></span>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <tr>
                                        <td colSpan="9" className="text-center">No Record(s)</td>
                                    </tr>
                                    : <tr>
                                        <td colSpan="9" className="text-center">Loading ..</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
