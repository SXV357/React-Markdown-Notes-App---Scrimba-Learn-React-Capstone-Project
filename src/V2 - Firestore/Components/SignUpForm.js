import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"
import { FormStyles, ActionStyles } from '../CustomStyles';

export default function SignUpForm(){

    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")

    function toLogin(){
      alert('You are now being redirected to the login page')
      window.location.href = '/login';
    }
    
    async function signUp(){
      try {
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        console.log("User created successfully")
        toLogin();
      }
      catch(e) {
        console.log(e.message);
      }
    }

    return (
      <Form style = {FormStyles}>
      <header><h2>Create a new account</h2></header>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange = {(e) => setSignUpEmail(e.target.value)} value = {signUpEmail}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value = {signUpPassword} onChange = {(e) => setSignUpPassword(e.target.value)}/>
      </Form.Group>
      
     <div style = {ActionStyles}>
        <Button variant="primary" type="submit" onClick = {signUp}>Sign Up</Button>
        <span> Already have an account? <Link to = '/login'><span className = "bold">Log In!</span></Link></span>
     </div>
    </Form>
    )
}