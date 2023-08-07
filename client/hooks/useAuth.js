import React, { createContext, useContext } from 'react';

const AuthContext = createContext({});

/**
 * AuthProvider Component
 *
 * A provider component that wraps the application and provides authentication-related functions and state.
 *
 * @param {ReactNode} children - The child components wrapped by the AuthProvider.
 */
export const AuthProvider = ({children}) => {

  /**
   * loginUser Function
   *
   * Logs in the user by sending a POST request to the login endpoint with the provided login details.
   * Stores the user session and other information in the local storage upon successful login.
   * Reloads the page to update the user session.
   *
   * @param {object} loginDetails - The login details of the user.
   */
  async function loginUser (loginDetails) {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://dw.engkong.com:5000/login', {
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
          
        } else if (resp.error == "known") {
          alert(resp.message);
        } else {
          console.log(resp.message)
          alert("Login Failed!");
        }
      });
      
  }; 

  /**
   * logoutUser Function
   *
   * Logs out the user by clearing the window localStorage and reloading the page.
   */
  async function logoutUser() {
    try {
      window.localStorage.clear();
      window.location.reload(false);
    } catch (error) {
      console.log(error)
      alert(error.message)
    }

  }; 

  /**
   * createUser Function
   *
   * Creates a new user by sending a POST request to the register endpoint with the provided details.
   * Reloads the page upon successful account creation.
   *
   * @param {object} loginDetails - The registration details of the user.
   */
  const createUser = async (loginDetails) => {
    const header = { 'Accept': 'application/json','Content-Type': 'application/json' };
    await fetch('http://dw.engkong.com:5000/register', {
      method: 'POST',	
      headers: header,
      body: JSON.stringify(loginDetails)})
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        if(resp.message == 'Account Created!') {
          window.location.reload(false);
          alert('Account Created!');
        } else if (resp.error == "known") {
          alert(resp.message);
        } else {
          console.log(resp.message)
          alert("Login Failed!");
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

/**
 * useAuth Hook
 *
 * A custom hook that provides access to the authentication-related functions and state in the AuthContext.
 */
export default function useAuth() {
  return useContext(AuthContext);
}