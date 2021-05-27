import React, {useContext} from 'react';
import './header.css';
import * as $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import {catchErrorHandler} from '../../../helper/common';
import userContext from '../../../user-context';
import {callApi} from '../../../helper/api';

export default function Header(){
    let {userData, updateUserData} = useContext(userContext);
    let history     =   useHistory();
    const toggleMenu  =   ()  =>  {
        if($('#mySidenav').css('margin-left') === '0px') {  
            $('#mySidenav').animate({
                marginLeft: "-=221px"
            }, 0);
            $('.content_area').animate({
                marginLeft: "0px",
                width: "100%"
            }, 0);            
        } else {$('#mySidenav').animate({
                marginLeft: "0px"
            }, 0);
            $('.content_area').animate({
                marginLeft: "221px",
                width: "97%"
            }, 0);
        }
    }

    const logout    =   async ()  =>   {
        try{
            const payload = await callApi('POST', `/logout/`, {});
            if(payload.data) {
                updateUserData({});
                history.push('/login');
            }
        } catch(err) {
            catchErrorHandler(err);
        }
    }
    return (
        <header className="header-bar">
            <div className="right-bar">
                <div className="row">
                    <div className="col logo-col">
                        <div className="header-logo">
                            <Link to='/dashboard'>
                                <h1>Dalyne</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="col">
                        <div className="right">
                            <ul>
                                <li className="header_dropdown slow">
                                    <div className="profile_pic">
                                        <span>Hello, Super Admin</span>
                                        <span className="arow">
                                            <i className="fas fa-angle-down"></i>
                                        </span>
                                    </div>
                                    <ul className="profile_submenu header_dropdown_list slow">
                                        <li><i className="fas fa-user"></i> Profile</li>
                                        <li><i className="fas fa-key"></i> Change Password</li>
                                        <li onClick={logout}><i className="fas fa-lock"></i> Logout</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}