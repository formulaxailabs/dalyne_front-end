import React from 'react';
import ProfileForm from './profile';
import './profile.css';

export default function Profile() {
  return (
    <main className="main-container">

        <div className="heading-bar">
            <div className="row">
                <div className="col-12">
                    <h2>Profile</h2>
                </div>
            </div>
        </div>

        <div className="main-body profile-body">
            <div className="row">
                <div className="col-12">
                    <div className="box p-4">
                        <ProfileForm />
                    </div>
                </div>
            </div>
        </div>
  </main>
  );
}
