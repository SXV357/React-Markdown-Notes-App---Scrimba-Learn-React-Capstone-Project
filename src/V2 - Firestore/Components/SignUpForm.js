import React, {useState} from 'react'
import {Form, Grid, Header, Segment } from 'semantic-ui-react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { boxStyles } from '../..';
import {Link} from "react-router-dom"

export default function SignUpForm(){

    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [user, setUser] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    function toLogin(){
        alert('You are now being redirected to the login page')
        window.location.href = '/login';
      }
    
      async function signUp(){
        try{
          await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword);
          console.log("User created successfully")
          toLogin();
        } catch(e){
          console.log(e.message);
        }
      }

    return (
    <Grid className = 'login-form' style={{ height: '100vh' }}>
      <Grid.Column style={boxStyles}>
        <Header as='h2' color='teal' textAlign='center'>
          <div className = "logo-and-header">Create an account</div>
        </Header>
        <Form size='large' className = "form">
          <Segment stacked>
            <input onChange = {(e) => setSignUpEmail(e.target.value)} value = {signUpEmail} className = "login-field" placeholder='E-mail address' />
            <input
              className = "login-field"
              value = {signUpPassword}
              onChange = {(e) => setSignUpPassword(e.target.value)}
              placeholder='Password'
              type='password'
            />
            <button onClick = {signUp} color='teal' fluid size='large' className = "btn">
              Sign Up
            </button>
            <div className = "message-box">Already have an account? <Link to = '/login'><span className = "bold">Log in!</span></Link></div>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    )
}