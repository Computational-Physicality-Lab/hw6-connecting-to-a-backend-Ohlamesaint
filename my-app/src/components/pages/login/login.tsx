import React, { FC, useEffect, useState } from "react";
import styles from "./login.module.scss";
import GoogleLogo from "../../../asset/assets/images/google-logo.png";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onUserLogin: Function;
  userImpl: any;
  isLoading: boolean;
  isLogin: boolean;
  loginHandle: Function;
}

const Login: FC<LoginProps> = ({ onUserLogin, userImpl, isLoading, isLogin, loginHandle }) => {


  const navigate = useNavigate();

  let loginWithGoogleClickHandler = async  (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {   
    
    await loginHandle();
    navigate("/");
    // setIsLoading(true);
    // if (!isLogin) {    
    //   signInWithPopup(auth, provider)
    //     .then((result) => {
    //       const credential = GoogleAuthProvider.credentialFromResult(result);
    //       const token = credential?.accessToken;
    //       const user = result.user;
    //       onUserLogin(user, token);
    //       setIsLogin(true);
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       const email = error.email;
    //       setIsLogin(false);
    //       const credential = GoogleAuthProvider.credentialFromError(error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // } else {
    //   onUserLogin(undefined, undefined);
    //   setIsLoading(false);
    //   setIsLogin(false);
    //   signOut(auth);
    // }
  };
  return (
    <div className={styles.Login}>
      {isLoading ? (
        <div className="spinner-container">
          <div className={styles.loading_spinner}></div>
        </div>
      ) : isLogin ? (
        <button
          className={styles.LogginButton}
          onClick={(e) => loginWithGoogleClickHandler(e)}
          disabled={isLoading}
        >
          Log out as {userImpl?.displayName}
        </button>
      ) : (
        <button
          className={styles.LogginButton}
          onClick={(e) => loginWithGoogleClickHandler(e)}
          disabled={isLoading}
        >
          <img src={GoogleLogo} alt="" />
          &nbsp; Log in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
