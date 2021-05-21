import React from 'react';
import './dashboard.css';

export default function Dashboard() {
  return (
    <main className="main-container">
        <div class="brd_cumb">
            <ul>
                <li>
                    <i class="fas fa-home" aria-hidden="true"></i>
                    <a href="/"> Home</a>&nbsp;/&nbsp;
                </li>
                <li>Dashboard</li>
                <div class="clear"></div>
            </ul>
        </div>

        <div className="heading-bar">
            <div className="row">
                <div className="col-12">
                    <h2>Dashboard</h2>
                </div>
            </div>
        </div>

        <div className="main-body dashboard">
            <div className="row">
                <div className="col-12">
                    <div className="box">
                        Dashboard Content
                    </div>
                </div>
            </div>
        </div>
  </main>
  );
}
