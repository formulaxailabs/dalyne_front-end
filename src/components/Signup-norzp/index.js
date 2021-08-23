import React, { useState, useEffect } from 'react';
import './signup.css';
import {callApi} from '../../helper/api';
import {catchErrorHandler} from '../../helper/common';

import SignupForm from './form';
export default function Signup() {
	let [plans, setPlan]	=	useState('');
	let [planList, setPlanList]	=	useState([]);
	let [featureList, setFeatureList]	=	useState([]);
	let [isLoading, setLoading] = useState(true);

	useEffect(() => {
		getPlan();
	}, [])

    const getPlan = async (e) => {
        try{
            setLoading(true);
            const payload = await callApi('GET', `/plans/list/`);
            if(payload.data) {
                setLoading(false);
				let result          =   payload.data.result || {};
				setPlanList(result.plans_list);
				setFeatureList(result.features);
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
							{/* <div className="table-hdr">
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
							</div> */}
							<div className="table-body">
								<ul>
									<li>
										<div className="plan-row">
											<ul className="d-flex">
												<li>
													<p>&nbsp;</p>
													{
														(featureList || []).map((item, k) => {
															return (
																<p key={k}>{item}</p>
															)
														})
													}
												</li>												
												{
													(planList || []).map((item, k) => {
														return (															
															<li>
																<p>
																	<button  onClick={() => setPlan(item.id)} className="btn slow">
																		{item.name}
																	</button>
																</p>
																<p>{item.pakage_validity}</p>
																<p>{item.download_points}</p>
																<p>{item.unlimited_data_access}</p>
																<p>{item.workspaces}</p>
																<p>{item.searches}</p>
																<p>{item.workspaces_validity}</p>
																<p>{item.workspaces_deletion_per_qtr}</p>
																<p>{item.shipment_limit_in_workspaces}</p>
																<p>{(item.add_on_points_Facility)?'Yes':'No'}</p>
																<p>{item.hot_products}</p>
																<p>{item.hot_company}</p>
																<p>{item.user}</p>
															</li>
														)
													})
												}
											</ul>
										</div>
									</li>
								</ul>
								{/* <table>
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
								</table> */}
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
