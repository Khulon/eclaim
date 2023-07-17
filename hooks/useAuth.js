import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {


  async function loginUser (loginDetails) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://10.0.1.28:5000/login', {
      method: 'POST', 
      headers: header,
      body: JSON.stringify(loginDetails)})
      .then((response) => response.json())
      .then((resp) => { 
        console.log(resp);
        if(resp.message == 'Login Successful!') {
          window.localStorage.setItem('sessionType', resp.userType);
          window.localStorage.setItem('session', resp.email);
          window.localStorage.setItem('userName', resp.name);
          window.localStorage.setItem('stackScreen', 'HomeStack');
          window.localStorage.setItem('image', resp.image);
          window.localStorage.setItem('details', JSON.stringify(resp.details));
          window.localStorage.setItem('token', resp.token)
          
          window.location.reload(false);
          
        } else if(resp.message == 'Account is locked!') {
          alert('Account is locked!');
        } else {
          alert('Login Failed!');
        }
      });
      
  }; 

  async function logoutUser () {
    try {
      window.localStorage.clear();
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    }

  }; 

  const createUser = async (loginDetails) => {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://10.0.1.28:5000/register', {
      method: 'POST',	
      headers: header,
      body: JSON.stringify(loginDetails)})
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        if(resp.message == 'Account Created!') {
          window.location.reload(false);
          alert('Account Created!');
        }
        else {
          alert('Account creation failed!');
        }
      });
      
  };

    return (
      <AuthContext.Provider value = {{
        loginUser,
        logoutUser,
        createUser,
        

      }}>

        {children}
      </AuthContext.Provider>
    )

};

export default function useAuth() {
  return useContext(AuthContext);
}