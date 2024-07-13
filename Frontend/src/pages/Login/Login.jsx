import Twibbleimage from "../../assets/images/LoginTweet.jpg";
import { SiDoubanread } from "react-icons/si";
import { useState, useEffect } from "react";
import "./Login.css";
import auth from "../../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { isMobile, browserName, osName, deviceType } from "react-device-detect";
import axios from "axios";
import CustomOtpInput from "./Otp";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorM, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleOtpSubmit = async () => {
    try {
      const payload = { email, otp };
      const response = await axios.post(
        "https://twibb.vercel.app/api/otp/verifyOtp",
        payload
      );
      if (response.data.valid) {
        console.log("OTP verified successfully");
        await signInWithEmailAndPassword(email, password);
        navigate("/");
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Invalid OTP");
    }
  };

  const handleSubmited = async (e) => {
    e.preventDefault();
    try {
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ip = ipResponse.data.ip;
      const loginInfo = {
        email,
        password,
        browser: browserName,
        os: osName,
        device: deviceType,
        userAgent: navigator.userAgent,
        ip,
      };

      const response = await axios.post(
        "https://twibb.vercel.app/api/login",
        loginInfo
      );

      if (response.data.otpRequired) {
        setOtpSent(true);
      } else {
        console.log("Login successful without OTP");
        await signInWithEmailAndPassword(email, password);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Incorrect email or password");
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().catch((err) => {
      setError(err.message);
    });
  };

  if (loading || googleloading) {
    console.log("loading....");
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="login-container">
        <div className="image-container">
          <img src={Twibbleimage} className="image" alt="Login" />
        </div>
        <div className="form-container">
          <SiDoubanread className="tdm-icon" />
          <div className="form-box">
            <h2 className="heading">Happening now</h2>
            <h3 className="heading1">What's happening today</h3>
            {otpSent ? (
              <div>
                <CustomOtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                />
                <button className="btn" onClick={handleOtpSubmit}>
                  Submit OTP
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmited}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="btn-login">
                  <button type="submit" className="btn">
                    Login
                  </button>
                </div>
              </form>
            )}
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
        Don't have an account?
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            color: "black",
            fontWeight: "600",
            marginLeft: "5px",
          }}
        >
          Signup
        </Link>
      </div>
    </>
  );
}

export default Login;
