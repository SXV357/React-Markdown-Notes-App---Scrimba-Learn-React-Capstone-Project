import React, {createContext, useState, useEffect} from "react"

const LoggedInContext = createContext();

export default function LoggedInContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginStatus = () => setIsLoggedIn(prevStatus => !prevStatus);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn])

  return (
    <LoggedInContext.Provider value = {{isLoggedIn, toggleLoginStatus}}>
        {children}
    </LoggedInContext.Provider>
  )
}

export {LoggedInContext}
