import React from 'react';
import './login.css';

import LoginForm from './form';
export default function Login() {
   	return (
	<main className="login_bg_body">
		<div className="login_body">		
			<div className="login-box-wrap">
				<div className="left">
					<img src="/images/login.jpg" />
				</div>
				<div className="right">
					<div className="login_box">
						<div className="inner">
							<h4>Dalyne</h4>
							<LoginForm/>
						</div>
					</div>
				</div>
				
			</div>
			<div className="clear"></div>
		</div>
	</main>
   	)
}
