import React, { useRef, useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  const [userType, setUserType] = useState({userType: null});
  const [user, setUser] = useState({email: null});
  const [loadingInitial, setLoadingInitial] = useState(true);

  
  useEffect(() => {

    if (user) {
      console.log(user.email);
    }
    console.log(loadingInitial)

    setLoadingInitial(false);
  });

  

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
            setUser({...user, email: resp.email});
          }
          setUserType({...userType, userType: resp.userType});
        });
    }; 

    return (
      <AuthContext.Provider value = {{
        user,
        userType,
        loadingInitial,

        loginUser,

      }}>

        {!loadingInitial && children}
      </AuthContext.Provider>
    )

};

export default function useAuth() {
  return useContext(AuthContext);
}