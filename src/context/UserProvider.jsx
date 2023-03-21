import React, { useEffect, useState } from 'react'
import { getCurrentUser, isLoggedIn } from '../auth';
import userContext from './userContext';

const UserProvider = ({ children }) => {
    
  const [user, SetUser] = useState({
    data: {},
    login: ''
  });

  useEffect(() => {
    SetUser({
      data: getCurrentUser(),
      login: isLoggedIn()
    });
  },[]);


  return (
      <userContext.Provider value={{user,SetUser}}>
          {children}
    </userContext.Provider>
  )
}

export default UserProvider;