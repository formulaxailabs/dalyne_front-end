import React from 'react';
import { Redirect } from 'react-router-dom';

export default function Home(){
    return (
      <div className="App">
        Loading....
        <Redirect to="/login"/>
      </div>
    );
}
