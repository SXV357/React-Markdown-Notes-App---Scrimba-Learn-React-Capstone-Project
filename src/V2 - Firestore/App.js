import React, {useState, useEffect, useContext} from "react"
import {Routes, Route, Link, useNavigate} from "react-router-dom"
import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm"
import Main from "./Main"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { LoggedInContext } from "./LoggedInContextProvider"

export default function App(){
  // eslint-disable-next-line
  const [user, setUser] = useState({})
  const [isSignedOut, setIsSignedOut] = useState(false);
  const navigate = useNavigate();
  const {isLoggedIn} = useContext(LoggedInContext);

  useEffect(() => {
    const setup = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    })
    return setup;
  }, [])

  return (
    <>
      {(!isLoggedIn || isSignedOut) && (
        <>
          <button><Link to="/login">Log In</Link></button>
          <button><Link to="/signup">Sign Up</Link></button>
        </>
      )}

      <Routes>
        <Route exact path = "/notes-app" element = {<Main currentUser = {user?.email} signOut = {() => {
          setIsSignedOut(true);
          navigate("/login");
        }}/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}