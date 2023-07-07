import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import AuthenticationProvider from './AuthenticationProvider';

ReactDOM.render(<React.StrictMode>
  <BrowserRouter>
    <AuthenticationProvider>
      <App/>
    </AuthenticationProvider>
  </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));