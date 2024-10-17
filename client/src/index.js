import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// redux
// import {configureStore} from '@reduxjs/toolkit';
// import allReducers from './reducers'
// import {Provider} from 'react-redux'
// const store = configureStore({
//   reducer: allReducers
// })

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </Router>,
  document.getElementById("root")
);
