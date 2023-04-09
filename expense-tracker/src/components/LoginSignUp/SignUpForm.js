import React, {  useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authStates } from "../States/Reducers/auth-reducer";

import { useDispatch } from "react-redux";
async function loginAndSignUp(signupData, isLogIn) {
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8";
  if (isLogIn) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error.message);
    } else {
      return data ;
    }
  } catch (error) {
    console.error(error); // handle signup error
  }
}

function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogIn, setIsLogin] = useState(false);
  const userIsLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const idToken = useSelector(state =>state.auth.idToken)
  const dispatch = useDispatch();
  const navto = useNavigate();
  if(userIsLoggedIn){
    navto(`/home/${idToken}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    if (isLogIn) {
      loginAndSignUp(userDetails, isLogIn).then(data=>{
          if(data.registered){
            dispatch(authStates.setLogin(true));
            dispatch(authStates.setIdToken(data.idToken));
            dispatch(authStates.setUserID(data.localId))
            localStorage.setItem("idToken", data.idToken);
            localStorage.setItem('userID' , data.localId);
            navto(`/home/${data.idToken}`)
          }
      });
    } else {
      if (password === confirmPassword) {
        loginAndSignUp(userDetails, isLogIn).then(data=>{
            if(!data.registered){
                setIsLogin(true);
            }
        });
      } else {
        alert("password mismatch");
      }
    }
  };

  const handleLoginClick = () => {
    setIsLogin((preState) => !preState);
  };

  return (
    <div className="signup-card">
      <h2>{`${isLogIn ? "Login" : "Sign Up"}`}</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Email:
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {!isLogIn && (
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        )}
        <button type="submit">{`${isLogIn ? "Login" : "Sign Up"}`}</button>
      </form>
      {isLogIn ? (
        <p className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      ) : (
        ""
      )}
      <button className="login-card" onClick={handleLoginClick}>
        <p className="login-text">{`${
          isLogIn ? "Create New Account" : "Already Have An Account ? Login"
        }`}</p>
      </button>
    </div>
  );
}

export default SignupForm;
