import React, { createContext, useContext } from 'react';

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
          window.localStorage.setItem('userName', resp.name);
          window.localStorage.setItem('stackScreen', 'HomeStack')
          window.location.reload(false);
        } else {
          alert('Login Failed!');
        }
      });
      
  }; 

  async function logoutUser () {
    window.localStorage.clear();
    window.location.reload(true);
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
        createUser

      }}>

        {children}
      </AuthContext.Provider>
    )

};

export default function useAuth() {
  return useContext(AuthContext);
}