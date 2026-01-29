import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// redux
// import {configureStore} from '@reduxjs/toolkit';
// import allReducers from './reducers'
// import {Provider} from 'react-redux'
// const store = configureStore({
//   reducer: allReducers
// })

const root = createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Router>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider> */}
    </Router>
  </HelmetProvider>
);
