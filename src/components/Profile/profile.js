import React, {useState, useEffect, useContext} from 'react';
import {callApi} from '../../helper/api';
import userContext from '../../user-context';
import {catchErrorHandler} from '../../helper/common'
import './profile.css';



export default function ProfileForm() {
    //const [isLoading, setLoading]	=	useState(true);
    const {userData, updateUserData} = useContext(userContext);
    const [details, setDetails] = useState({});

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile	=	async ()	=>	{
        try {
            //setLoading(true);
            const payload = await callApi('GET', `/profile/`);
            if (payload.data.error) {
                //setLoading(false);
            }
            else {
                const result = payload.data || {};
                setDetails(result[0]);
                //console.log(result)
                /* setDetails({
                    id: result.id,
                    email: result.email_id || userData.email,
                    firstname: result.firstname || userData.firstname,
                    lastname: result.lastname || userData.lastname
                }) */
                //setLoading(false);
            }
        } catch(err) {
            //setLoading(false);
            catchErrorHandler(err);
        }
    }

    return (
    <div className="profile-body">
        <div className="info-body">
            <h2>{details.firstname} {details.lastname}</h2>
            <h4>{details.email}</h4>
        </div>
        <div className="row">
            <div className="col-6">
                <div className="fld-group">
                    <label>Company Name</label>
                    <p><strong>{details.company_name}</strong></p>
                </div>
                <div className="fld-group">
                    <label>Email</label>
                    <p><strong>{details.email}</strong></p>
                </div>
                <div className="fld-group">
                    <label>Full Name</label>
                    <p><strong>{details.firstname} {details.lastname}</strong></p>
                </div>
                <div className="fld-group">
                    <label>Phone No</label>
                    <p><strong>{details.phone_no}</strong></p>
                </div>
            </div>
            <div className="col-6">
                <div className="profile-balance">
                    <h5>My Balance</h5>
                    <ul>
                        {
                            !!details.remaining_download_points ? 
                            <li>
                                <div className="fld-group">
                                    <p><strong>{details.remaining_download_points}</strong></p>
                                    <label>Remaining Download Points</label>
                                </div>
                            </li>
                            : null
                        }
                        {
                            !!details.remaining_search_points ? 
                            <li>
                                <div className="fld-group">
                                    <p><strong>{details.remaining_search_points}</strong></p>
                                    <label>Remaining Search Points</label>
                                </div>
                            </li>
                            : null
                        }
                        <li>
                            <div className="fld-group">
                                <p><strong>{details.total_download_points}</strong></p>
                                <label>Total Download Points</label>
                            </div>
                        </li>
                        <li>
                            <div className="fld-group">
                                <p><strong>{details.total_search_points}</strong></p>
                                <label>Total Search Points</label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
}
