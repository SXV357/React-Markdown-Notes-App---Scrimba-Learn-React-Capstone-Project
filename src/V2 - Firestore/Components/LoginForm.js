import React, {useState, useContext} from 'react'
import {Form, Grid, Header, Segment } from 'semantic-ui-react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { boxStyles } from '../CustomStyles';
import {Link, useNavigate} from "react-router-dom"
import { LoggedInContext } from '../LoggedInContextProvider';

export default function LoginForm(){

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const {toggleLoginStatus} = useContext(LoggedInContext);
    const navigate = useNavigate();
    // const [user, setUser] = useState({})
    // // need to check whether user.email exists and then log them into the app

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // })

    const handleLogin = () => {
      // upon successful login only
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
        <Grid className = 'login-form' style={{ height: '100vh' }}>
        <Grid.Column style={boxStyles}>
          <Header as='h2' color='teal' textAlign='center'>
            <div className = "logo-and-header">Log-in to your account</div>
          </Header>
          <Form size='large' className = "form">
            <Segment stacked>
              <input onChange = {(e) => setLoginEmail(e.target.value)} value = {loginEmail} className = "login-field" placeholder='E-mail address' />
              <input
                className = "login-field"
                value = {loginPassword}
                onChange = {(e) => setLoginPassword(e.target.value)}
                placeholder='Password'
                type='password'
              />
              <button onClick = {logIn} color='teal' fluid size='large' className = "btn">
                Login
              </button>
              <div className = "message-box">New to Us? <Link to = '/signup'><span className = "bold">Sign up!</span></Link></div>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
}