import React, { useState, useEffect } from 'react';
import './signup.css';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';

import SignupForm from './form';
export default function Signup() {
	let [plans, setPlan]	=	useState('');
	let [planList, setPlanList]	=	useState([]);
	let [isLoading, setLoading] = useState(true);

	useEffect(() => {
		getPlan();
	}, [])

    const getPlan = async (e) => {
        try{
            setLoading(true);
            const payload = await callApi('GET', `/import-export/plans-listView/`);
            if(payload.data) {
                setLoading(false);
				let result          =   payload.data.result || {};
				setPlanList(result);
				console.log(result);
            } else {
                setLoading(false);
            }
        } catch(err) {
            setLoading(false);
            catchErrorHandler(err);
        }
	}
	
   	return (
	<main className="login_bg_body">
		<div className="login_body">		
			<div className="login-box-wrap">
				{
					(!!!plans) ?
					<div className="signup-plan">
						<div className="res-table">
							<div className="table-hdr">
								<table>
									<tbody>
										<tr>
											<th>Plans</th>
											<th>Free</th>
											<th>Startup</th>
											<th>SME</th>
											<th>Corporate</th>
										</tr>
										<tr>
											<td></td>
											<td onClick={() => setPlan(1)}>
												<button className="btn slow">Free</button>
											</td>
											<td onClick={() => setPlan(1)}>
												<button className="btn slow">Startup</button>
											</td>
											<td onClick={() => setPlan(1)}>
												<button className="btn slow">SME</button>
											</td>
											<td onClick={() => setPlan(1)}>
												<button className="btn slow">Corporate</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="table-body">
								<table>
									<tbody>
										<tr>
											<td>Cost</td>
											<td>Free</td>
											<td>1500 USD/ Year</td>
											<td>4500 USD/Year</td>
											<td>9600 USD/Year</td>
										</tr>
										<tr>
											<td>All data Access of All Countries as per the availability</td>
											<td>USA (JFM 2011) India (JFM 2012)</td>
											<td>Yes (except Bangladesh)</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>Cost</td>
											<td>Free</td>
											<td>1500 USD/ Year</td>
											<td>4500 USD/Year</td>
											<td>9600 USD/Year</td>
										</tr>
										<tr>
											<td>All data Access of All Countries as per the availability</td>
											<td>USA (JFM 2011) India (JFM 2012)</td>
											<td>Yes (except Bangladesh)</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>Cost</td>
											<td>Free</td>
											<td>1500 USD/ Year</td>
											<td>4500 USD/Year</td>
											<td>9600 USD/Year</td>
										</tr>
										<tr>
											<td>All data Access of All Countries as per the availability</td>
											<td>USA (JFM 2011) India (JFM 2012)</td>
											<td>Yes (except Bangladesh)</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>Cost</td>
											<td>Free</td>
											<td>1500 USD/ Year</td>
											<td>4500 USD/Year</td>
											<td>9600 USD/Year</td>
										</tr>
										<tr>
											<td>All data Access of All Countries as per the availability</td>
											<td>USA (JFM 2011) India (JFM 2012)</td>
											<td>Yes (except Bangladesh)</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
										<tr>
											<td>One Year Validity</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
											<td>Yes</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div> :
					<div className="signup-box">
						<div className="left">
							<img src="/images/login.jpg" />
						</div>
						<div className="right">
							<div className="login_box">
								<div className="inner">
									<h4>Dalyne</h4>
									<SignupForm plans={plans}/>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
			<div className="clear"></div>
		</div>
	</main>
   	)
}
