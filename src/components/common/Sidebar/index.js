import React, {useState} from 'react';
import './sidebar.css';
import * as $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';

export default function Sidebar(props){
    let [selIndex, setIndex]    =   useState(0);
    let [isShowMenu, setShowMenu] = useState(false);
    let history = useHistory();
    let userMenu    =   [{
        "menuName":"Home",
        "menuIcon":"fa fa-home icon",
        "menuUrl":"/dashboard"
    },{
        "menuName":"My Account",
        "menuIcon":"fas fa-user-tie icon",
        "menuUrl":"",
        "submenuList":[{
                "submenuName":"Profile",
                "submenuUrl":""
            }, {
                "submenuName":"Edit Profile",
                "submenuUrl":""
            }
        ]
    }, {
        "menuName":"My Workspace",
        "menuIcon":"fa fa-briefcase icon",
        "menuUrl":""
    }, {
        "menuName":"My Downloads",
        "menuIcon":"fa fa-download icon",
        "menuUrl":""
        },
        {
            "menuName":"Favourite Shipment",
            "menuIcon":"fas fa-bookmark icon",
            "menuUrl":""
        },
        {
            "menuName":"Subscription Plan",
            "menuIcon":"fas fa-file icon",
        "menuUrl":""
        },
        {
            "menuName":"Ticket Management",
            "menuIcon":"fas fa-ticket-alt icon",
        "menuUrl":""
        },
        {
            "menuName":"Notification",
            "menuIcon":"fas fa-bell icon",
            "menuUrl":""
        },
        {
            "menuName":"Access Log",
            "menuIcon":"fas fa-key icon",
            "menuUrl":""
        },
        {
            "menuName":"User",
            "menuIcon":"fas fa-user-tie icon",
            "menuUrl":"/user"
        }
    ]

    const toggleMenu    =   (e, i) => {
        e.stopPropagation();
        if(i === selIndex)
            setIndex('');
        else
            setIndex(i);
    }

    const toggleSidenav  =   (e)  =>  {
        e.stopPropagation();
        if($('#mySidenav').css('margin-left') === '0px') {  
            $('#mySidenav').animate({
                marginLeft: "-100%"
            }, 0);
            $('.content_area').animate({
                marginLeft: "0px",
                width: "100%"
            }, 0);
            setShowMenu(false);
        } else {$('#mySidenav').animate({
                marginLeft: "0px"
            }, 0);
            $('.content_area').animate({
                marginLeft: "100%",
                width: "100%"
            }, 0);
            setShowMenu(true);
        }
    }

    const redirectTo = (e, url) => {
        e.stopPropagation();
        $('#mySidenav').animate({
            marginLeft: "-100%"
        }, 0);
        $('.content_area').animate({
            marginLeft: "0px",
            width: "100%"
        }, 0); 
        setShowMenu(false);
        history.push(url)
    }

    const handleOuterClick = (e) => {
        e.stopPropagation();
        $('#mySidenav').animate({
            marginLeft: "-100%"
        }, 0);
        $('.content_area').animate({
            marginLeft: "0px",
            width: "100%"
        }, 0); 
        setShowMenu(false);
    }

    return ( 
        < >
            <div className="side-nav-bar-body" onClick={handleOuterClick} id="mySidenav">
                <div className="side-nav-bar">
                    <ul>
                    {
                        (userMenu || []).map((menu, i) => {
                            return (
                                <li key={i} className={`${(selIndex === i)? 'selected':''}`}>
                                    {
                                        (!!menu.menuUrl) ?
                                        <div className="menu-Items" onClick={(e) => redirectTo(e, menu.menuUrl)}>
                                            <label>
                                                {
                                                    (!!menu.menuIcon) ? 
                                                    <span className={menu.menuIcon} aria-hidden="true"></span> :
                                                    <span className="fas fa-user-tie icon"></span>
                                                }
                                                <span>{menu.menuName}</span>
                                            </label>
                                            {
                                                (!!menu.submenuList && menu.submenuList.length > 0) ? 
                                                <span className={`fas ${(selIndex === i)? 'fa-chevron-down':'fa-chevron-right'} icon-down`}></span>
                                                : null
                                            }
                                        </div> : <>
                                        <div className="menu-Items" onClick={(e) => toggleMenu(e, i)}>
                                            <label>
                                                {
                                                    (!!menu.menuIcon) ? 
                                                    <span className={menu.menuIcon} aria-hidden="true"></span> :
                                                    <span className="fas fa-user-tie icon"></span>
                                                }
                                                <span>{menu.menuName}</span>
                                            </label>
                                            {
                                                (!!menu.submenuList && menu.submenuList.length > 0) ? 
                                                <span className={`fas ${(selIndex === i)? 'fa-chevron-down':'fa-chevron-right'} icon-down`}></span>
                                                : null
                                            }
                                            
                                        </div>
                                        <ul className="child-menu" style={{display:`${(selIndex === i)? 'block': 'none'}`}}>
                                            {
                                                (menu.submenuList || []).map((submenu, k) => {
                                                    return (
                                                        (submenu.submenuName !== 'Logout') ?
                                                            (!!submenu.submenuUrl) ?
                                                            <li key={k} className="child-menu-list" onClick={toggleSidenav}>
                                                                <Link to={submenu.submenuUrl}>
                                                                    <span dangerouslySetInnerHTML={{ __html: submenu.submenuName}}></span>
                                                                </Link>
                                                            </li> : <li className="child-menu-list" key={k} onClick={toggleSidenav}>
                                                                <Link to='/dashboard'>
                                                                    <span dangerouslySetInnerHTML={{ __html: submenu.submenuName}}></span>
                                                                </Link>
                                                            </li>
                                                        : <li key={k} className="child-menu-list" onClick={toggleSidenav}>
                                                            <a href="/">
                                                                <span dangerouslySetInnerHTML={{ __html: submenu.submenuName}}></span>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }   
                                        </ul>
                                        </>
                                    }
                                </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <button onClick={toggleSidenav} className="menu-icon">
                {
                    (!!isShowMenu) ? 
                    <span className="fas fa-times icon"></span> :
                    <span className="fas fa-bars icon"></span>
                }
            </button>
        </>  
    )
};