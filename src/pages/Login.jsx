import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {toast} from "react-toastify";
import { GrGoogle } from "react-icons/gr";
import { GoogleAuthProvider } from "firebase/auth";
import { motion } from "motion/react";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
 const { signinWithAndPass, signInWithGoogle } = use(AuthContext);

  const provider = new GoogleAuthProvider();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    setError("");
    setSuccess(false);

    signinWithAndPass(email, password)
      .then((result) => {
        setSuccess(result.user);
        toast("Successfully logged in!", {
          position: "top-center",
          autoClose: 1000,
        });
        event.target.reset();
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = (event) => {
    event.preventDefault();

    signInWithGoogle(provider)
      .then((result) => {
        setSuccess(result.user);
        toast("Sign in successfully with google", {position: "top-center",autoClose: 1000, });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
    <div className="hero bg-base-100 min-h-screen">
    <title>Sign In</title>
      <div className="hero-content flex-col w-full">
        <div className="text-center lg:text-left mb-4">
          <h1 className="text-4xl font-bold">Login your account!</h1>
        </div>

        <div className="card bg-base-300 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
                <p className="underline cursor-pointer">Forgot password</p>

                <button type="submit" className="py-1.5 rounded-md text-[18px] mt-4 bg-base-100 max-w-[320px] shadow-sm shadow-amber-900 cursor-pointer">
                  Login
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn mt-4 bg-white text-black border-[#e5e5e5]"
                >
                  <GrGoogle />
                  Login with Google
                </button>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link className="font-bold" to="/registration">
                    Register
                  </Link>
                </p>
              </fieldset>
              {success && (
                <p className="text-green-400 mt-3 text-center">
                  Login successfull!
                </p>
              )}
              {error && (
                <p className="text-red-400 mt-3 text-center">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Login;
