import React from 'react';
import ReactDOM from 'react-dom';
import App from './V2 - Firestore/App';
import {BrowserRouter} from "react-router-dom"
import LoggedInContextProvider from './V2 - Firestore/LoggedInContextProvider';

ReactDOM.render(<React.StrictMode>
  <BrowserRouter>
    <LoggedInContextProvider>
      <App/>
    </LoggedInContextProvider>
  </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));