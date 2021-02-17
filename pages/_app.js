import React from "react";
import AuthState from "../context/auth/authState";
//import AppState from '../context/app/appState';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  );
};
export default MyApp;
