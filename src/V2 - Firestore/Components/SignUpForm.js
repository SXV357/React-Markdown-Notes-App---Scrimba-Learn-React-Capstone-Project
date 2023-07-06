import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import {Form, Grid, Header } from 'semantic-ui-react'
import {Link} from "react-router-dom"
import { FormStyles, ActionStyles, InputGroupStyles, ButtonStyles } from '../CustomStyles';
import UseCredentialValidation from '../UseCredentialValidation';

export default function SignUpForm(){

    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const {error, validate} = UseCredentialValidation();

    function toLogin(){
      alert('You are now being redirected to the login page')
      window.location.href = '/login';
    }
    
    async function signUp(){
      try {
        validate(signUpEmail, signUpPassword);
        await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
        console.log("User created successfully")
        toLogin();
      }
      catch(e) {
        console.log(e.message)
      }
    }

    return (
      <Grid className = 'login-form' style={FormStyles}>
      <Grid.Column>
        <Header as='h2' color='teal' textAlign='center'>
          <div className = "logo-and-header">Create a new account</div>
        </Header>
        <Form size='large' className = "form">
            <div style = {InputGroupStyles}>
              <label htmlFor = "email">Email</label>
              <input onChange = {(e) => setSignUpEmail(e.target.value)} value = {signUpEmail} className = "email-field" placeholder='Email' />
            </div>
            <div style = {InputGroupStyles}>
              <label htmlFor = "password">Password</label>
              <input
                className = "password-field"
                value = {signUpPassword}
                onChange = {(e) => setSignUpPassword(e.target.value)}
                placeholder='Password'
                type='password'
              />
            </div>
            <div style = {{color: "rgb(255,0,0)", marginTop: "7px", textAlign: "center"}}>{error}</div>
            <div style={ActionStyles}>
              <button style = {ButtonStyles} onClick = {signUp} color='teal' fluid size='large' className = "btn">
                Sign Up
              </button>
              <div className = "message-box">Already have an account? <Link style = {{textDecoration: "none", fontWeight: "bold", color: "#000"}} to = '/login'><span className = "bold">Log in!</span></Link></div>
            </div>
        </Form>
      </Grid.Column>
    </Grid>
    )
}