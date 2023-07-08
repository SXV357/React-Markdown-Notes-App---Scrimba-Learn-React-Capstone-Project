import React, {useState, useContext} from 'react'
import {Form, Grid, Header } from 'semantic-ui-react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {Link, useNavigate} from "react-router-dom"
import { LoggedInContext } from '../Context/AuthenticationProvider';
import { FormStyles, ActionStyles, InputGroupStyles } from '../CustomStyles';
import UseCredentialValidation from '../Hooks/UseCredentialValidation';
import UsePasswordDisplayToggle from '../Hooks/UsePasswordDisplayToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const {toggleLoginStatus} = useContext(LoggedInContext);
    const navigate = useNavigate();
    const {error, setError, validate} = UseCredentialValidation();
    const {displayPw, icon, toggleDisplayPw, displayConditions, validPassword} = UsePasswordDisplayToggle(loginPassword);

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
          case "auth/wrong-password": setError("Incorrect password. Please try again"); break;
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
              <div className = "inputIconWrapper">
                <input
                  className = "password-field"
                  value = {loginPassword}
                  onChange = {(e) => setLoginPassword(e.target.value)}
                  placeholder='Password'
                  type= {displayPw ? "text" : "password"}
                />
                <FontAwesomeIcon className = "icon" icon = {icon} onClick = {toggleDisplayPw}/>
              </div>
            </div>
            {displayConditions()}
            <div style = {{color: "rgb(255,0,0)", marginTop: "7px", textAlign: "center"}}>{error}</div>
              <div style = {ActionStyles}>
                <button disabled = {!validPassword} onClick = {logIn} className = "btn">
                  Login
                </button>
                <div className = "message-box">New to Us? <Link style = {{textDecoration: "none", fontWeight: "bold", color: "#000"}} to = '/signup'><span className = "bold">Sign up!</span></Link></div>
              </div>
          </Form>
        </Grid.Column>
      </Grid>
    )
}