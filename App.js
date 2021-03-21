import React, {useState} from 'react';
import {UserLoginInfo} from './app/context/userLoginInfo'

import RootDrawerNavigator from './app/screens/UserOptionsList'
import AccountContainerApp from './app/screens/AccountScreen'
export default function App() {
  const [userLoginInfo, setUserLoginInfo] = useState({userID: "", token:"", isAuthorized:false}); 

  return (
    <UserLoginInfo.Provider value={{userLoginInfo,setUserLoginInfo}}>

    <>
    {
      userLoginInfo.isAuthorized ? 
      (
          
        <RootDrawerNavigator/>

      )
      :
      ( 
         
        <AccountContainerApp/>

      )
    }

    </>
    </UserLoginInfo.Provider>
  );
}


