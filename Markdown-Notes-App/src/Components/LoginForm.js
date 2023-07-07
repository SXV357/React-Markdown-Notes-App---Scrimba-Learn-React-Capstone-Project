import React, {useState, useContext} from 'react'
import {Form, Grid, Header } from 'semantic-ui-react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {Link, useNavigate} from "react-router-dom"
import { LoggedInContext } from '../V2 - Firestore/AuthenticationProvider';
import { FormStyles, ActionStyles, InputGroupStyles, ButtonStyles } from '../V2 - Firestore/CustomStyles';
import UseCredentialValidation from '../V2 - Firestore/UseCredentialValidation';

export default function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const {toggleLoginStatus} = useContext(LoggedInContext);
    const navigate = useNavigate();
    const {error, setError, validate} = UseCredentialValidation();

    const handleLogin = () => {
      // window.location.href causes page refresh causing context to be reset
      alert("You are now being redirected to the application")
      navigate("/notes-app");
    }
    
    async function logIn(){
      try {
        validate(loginEmail, loginPassword);
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        console.log("User logged in successfully")
        toggleLoginStatus();
        handleLogin();
      }
      catch (e) {
        switch (e.code){
          case "auth/user-not-found": setError("This email is non-existent. Please create an account before logging in."); break;
          case "auth/invalid-email": setError("The email doesn't conform to the default naming convention. Please enter a valid one."); break;
          case "auth/wrong-password": setError("Incorrect password. Please try again"); break;
          default: setError(`An unknown error occurred: ${e.message}`);
        }
      }
    }

    return (
      <Grid className = 'login-form' style={FormStyles}>
        <Grid.Column>
          <Header as='h2' color='teal' textAlign='center'>
            <div className = "logo-and-header">Log into an existing account</div>
          </Header>
          <Form size='large' className = "form">
            <div style = {InputGroupStyles}>
              <label htmlFor = "email">Email</label>
              <input onChange = {(e) => setLoginEmail(e.target.value)} value = {loginEmail} className = "email-field" placeholder='Email' />
            </div>
            <div style = {InputGroupStyles}>
              <label htmlFor = "password">Password</label>
              <input
                className = "password-field"
                value = {loginPassword}
                onChange = {(e) => setLoginPassword(e.target.value)}
                placeholder='Password'
                type='password'
              />
            </div>
            <div style = {{color: "rgb(255,0,0)", marginTop: "7px", textAlign: "center"}}>{error}</div>
              <div style = {ActionStyles}>
                <button style = {ButtonStyles} onClick = {logIn} color='teal' fluid size='large' className = "btn">
                  Login
                </button>
                <div className = "message-box">New to Us? <Link style = {{textDecoration: "none", fontWeight: "bold", color: "#000"}} to = '/signup'><span className = "bold">Sign up!</span></Link></div>
              </div>
          </Form>
        </Grid.Column>
      </Grid>
    )
}