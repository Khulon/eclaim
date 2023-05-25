import React, { useRef, useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  async function loginUser (loginDetails) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://localhost:5000/login', {
      method: 'POST', 
      headers: header,
      body: JSON.stringify(loginDetails)})
      .then((response) => response.json())
      .then((resp) => { 
        console.log(resp);
        if(resp.message == 'Login Successful!') {
          window.localStorage.setItem('sessionType', resp.userType);
          window.localStorage.setItem('session', resp.email);
        }
      });
      window.location.reload(false);
  }; 

  async function logoutUser () {
    window.localStorage.clear();
    window.location.reload(false);
  }; 

  const createUser = async (loginDetails) => {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://localhost:5000/register', {
      method: 'POST',	
      headers: header,
      body: JSON.stringify(loginDetails)})
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        if(resp.message == 'Account Created!') {
          window.localStorage.setItem('sessionType', resp.userType);
          window.localStorage.setItem('session', resp.user);
        }
        
      });
      window.location.reload(false);
  };

    return (
      <AuthContext.Provider value = {{

        loginUser,
        logoutUser,
        createUser

      }}>

        {children}
      </AuthContext.Provider>
    )

};

export default function useAuth() {
  return useContext(AuthContext);
}