import React from "react";
import { auth, provider } from "../firebase/firebase_utils";
// import { BrowserRouter as useNavigate } from "react-router-dom";

function Login() {
  // const navigate = useNavigate();
  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log("That's you😂" + JSON.stringify(result));
        localStorage.setItem("result", JSON.stringify(result));
        document.location.href = "http://localhost:3000/";
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Its the Login Page</h1>
      <button onClick={SignIn}>Login</button>
    </div>
  );
}

export default Login;
