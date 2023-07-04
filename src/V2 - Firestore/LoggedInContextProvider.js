import React, {createContext, useState} from "react"

const LoggedInContext = createContext();

export default function LoggedInContextProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginStatus = () => setIsLoggedIn(prevStatus => !prevStatus);

  return (
    <LoggedInContext.Provider value = {{isLoggedIn, toggleLoginStatus}}>
        {children}
    </LoggedInContext.Provider>
  )
}

export {LoggedInContext}
