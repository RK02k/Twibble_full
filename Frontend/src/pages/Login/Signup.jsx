import Twibbleimage from "../../assets/images/LoginTweet.jpg";
import { SiDoubanread } from "react-icons/si";
import { useState } from "react";
import "./Login.css";
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorM, setError] = useState("");

  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmited = (e) => {
    e.preventDefault();
    // console.log(email, password);
    createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = {
          username: username,
          password: password,
          name: name,
          email: email,
          plan: "free",
          language: "english", // Adding the plan property here
        };
        axios.post("https://twibb.vercel.app/register", user);
      })
      .catch((err) => {
        console.log(err);
        setError("Email is already taken, please use another one.");
      });
  };

  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  if (user || googleuser) {
    navigate("/");
    console.log(user);
    console.log(googleuser);
  }

  if (loading || googleloading) {
    console.log("loading....");
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle().catch((err) => {
      setError(err.message);
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={Twibbleimage} className="image" alt="Login" />
        </div>
        <div className="form-container">
          <div className="form-box">
            <SiDoubanread className="tdm-icon" />
            <h2 className="heading">Happening now</h2>
            <h3 className="heading1">Join Twibble today</h3>
            <form onSubmit={handleSubmited}>
              <input
                type="text"
                className="display-name"
                placeholder="Enter username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                className="display-name"
                placeholder="Enter full name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-login">
                <button type="submit" className="btn">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="google-button-container">
        <GoogleButton
          className="g-btn"
          type="light"
          onClick={handleGoogleSignIn}
        ></GoogleButton>
      </div>
      <div className="google-button-container">
        If you have an account?
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "600",
            marginLeft: "5px",
          }}
        >
          Login
        </Link>
      </div>
    </>
  );
}

export default Signup;
