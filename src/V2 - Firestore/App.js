import React, {useState, useEffect, useContext} from "react"
import {Routes, Route, Link, useNavigate} from "react-router-dom"
import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm"
import Main from "./Main"
import Button from 'react-bootstrap/Button';
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import { AuthenticationButtonContainerStyles } from "./CustomStyles"
import { LoggedInContext } from "./AuthenticationProvider"

export default function App(){
  // eslint-disable-next-line
  const [user, setUser] = useState({})
  const navigate = useNavigate();
  const {isLoggedIn, isSignedOut, toggleSignOutStatus} = useContext(LoggedInContext);

  useEffect(() => {
    const setup = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    })
    return setup;
  }, [])

  return (
    <>
      {(!isLoggedIn || isSignedOut) && (
        <div style = {AuthenticationButtonContainerStyles}>
          <Link to = "/login"><Button variant = "outline-primary" size = "lg">Log In</Button></Link>
          <Link to = "/signup"><Button variant = "outline-primary" size = "lg">Sign Up</Button></Link>
        </div>
      )}

      <Routes>
        <Route exact path = "/notes-app" element = {<Main currentUser = {user?.email} signOut = {() => {
          toggleSignOutStatus();
          navigate("/login");
        }}/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}