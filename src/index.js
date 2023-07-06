import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './V2 - Firestore/App';
import {BrowserRouter} from "react-router-dom"
import AuthenticationProvider from './V2 - Firestore/AuthenticationProvider';

ReactDOM.render(<React.StrictMode>
  <BrowserRouter>
    <AuthenticationProvider>
      <App/>
    </AuthenticationProvider>
  </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));