import React from "react"
import {Routes, Route, Link} from "react-router-dom"
import LoginForm from "./Components/LoginForm"
import SignUpForm from "./Components/SignUpForm"
import Main from "./Main"

export default function App(){
  return (
    <>
      <button><Link to="/login">Log In</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path = "/notes-app" element = {<Main />} />
      </Routes>
    </>
  )
}