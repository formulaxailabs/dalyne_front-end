import React, { useEffect, useState } from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/fontawesome.css';
import './assets/css/style.css';
import './assets/css/theme/White.css';
import './assets/css/responsive.css';
import {isEmpty} from 'lodash';
import Router from './routes';
import userContext from './user-context';

function App() {
  let [userData, setUserData] = useState(null);
  useEffect(() => {
    //const cookies = context.req.headers.cookie;
    let userData    = JSON.parse(localStorage.getItem('user') || '{}');
    setUserData({...userData});
  }, [])
  
  const updateUserData = (userData)  =>  {
    if(!!!userData || isEmpty(userData)) {
      localStorage.removeItem('user');
      setUserData({});
    } else {
      localStorage.setItem('user', JSON.stringify(userData));
      setUserData({...userData});
    }
  }

  return (
    <div className="app header-fixed aside-menu-fixed sidebar-lg-show pace-done sidebar-lg-show">
      <userContext.Provider value={{userData: userData, updateUserData: updateUserData}}>
        <div id="notify" className="notify"></div>
        <Router/>
      </userContext.Provider>
    </div>
  );
}

export default App;