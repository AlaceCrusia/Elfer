import React from "react";
import db, { auth, provider } from "../firebase/firebase_utils";
import "./Login.css";
// import { BrowserRouter as useNavigate } from "react-router-dom";

function Login() {
  // const navigate = useNavigate();
  const InitializeUser = (id) => {
    db.collection("Notebooks")
      .doc(id)
      .set({
        Playlist: "PL6NdkXsPL07IOu1AZ2Y2lGNYfjDStyT6O",
      })
      .then(function () {
        console.log("Playlist Update");
        db.collection("Notebooks")
          .doc(id) //For Security Purpose
          .collection("Notebook")
          .doc("Notebook") //Dynamic
          .collection("Note")
          .doc()
          .set({
            File: "sample%2Fsample.pdf?alt=media&token=3d364591-5311-4be5-bb53-561c7cbd67ce",
            Name: "Sample",
            Time: new Date().getTime().toString(),
          })
          .then(function () {
            alert("hurray! your Account has been successfully created");
            document.location.href = "http://localhost:3000/";
            console.log("Account created");
          });
      });
  };

  const SignIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log("That's you😂" + JSON.stringify(result));
        localStorage.setItem("result", JSON.stringify(result));
        const data = localStorage.getItem("result");
        let user_data = JSON.parse(data);
        let _data = user_data.user.uid;
        InitializeUser(_data);
        alert("Please wait while we're creating your account");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="Login">
      <button className="login-with-google-btn" onClick={SignIn}>
        Login with Google
      </button>
    </div>
  );
}

export default Login;
