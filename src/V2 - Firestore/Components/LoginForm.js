import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import {Link, useNavigate} from "react-router-dom"
import { LoggedInContext } from '../AuthenticationProvider';
import { FormStyles, ActionStyles } from '../CustomStyles';

export default function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const {toggleLoginStatus} = useContext(LoggedInContext);
    const navigate = useNavigate();

    const handleLogin = () => {
      // window.location.href causes page refresh causing context to be reset
      alert("You are now being redirected to the application")
      navigate("/notes-app");
    }
    
    async function logIn(){
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log("User logged in successfully")
        toggleLoginStatus();
        handleLogin();
      } 
      catch(e) {
        console.log(e.message);
      }
    }

    return (
      <Form style = {FormStyles}>
      <header><h2>Log into an existing account</h2></header>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange = {(e) => setLoginEmail(e.target.value)} value = {loginEmail}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value = {loginPassword} onChange = {(e) => setLoginPassword(e.target.value)}/>
      </Form.Group>
      
      <div style = {ActionStyles}>
        <Button variant="primary" type="submit" onClick = {logIn}>Log In</Button>
        <span>New to Us? <Link to = '/signup'><span className = "bold">Sign up!</span></Link></span>
      </div>
    </Form>
    )
}