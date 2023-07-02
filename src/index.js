import React from 'react';
import ReactDOM from 'react-dom';
import App from './V2 - Firestore/App';
import {BrowserRouter} from "react-router-dom"

export const boxStyles = {
  maxWidth: "450px",
  border: "1px solid #000",
  padding: "30px",
  height: "300px",
  position: "relative",
}

ReactDOM.render(<React.StrictMode>
  <BrowserRouter>
    <App/>
  </BrowserRouter>
</React.StrictMode>, document.getElementById('root'));