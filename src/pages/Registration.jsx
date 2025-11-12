import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { AuthContext } from "../context/AuthContext";
import { GoogleAuthProvider } from "firebase/auth";
import { GrGoogle } from "react-icons/gr";
import { toast } from "react-toastify";
const Registration = () => {
  const { signupWithEmailAndPass, updateUser, setUser, signInWithGoogle } = use(AuthContext);
const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    setError("");
    setSuccess(false);
    setNameError("");

    if (name.length <= 5) {
      setNameError("Name must be at least 6 characters long");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long, include at least one uppercase, one lowercase, and one special character."
      );
      return;
    }

    signupWithEmailAndPass(email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        updateUser(name, photo)
          .then(() => {
            setSuccess({ ...user, displayName: name, photoURl: photo });
          })
          .catch((error) => {
            console.log(error);
          });
        navigate(`${location.state ? location.state : "/"}`);
        event.target.reset();
      })
      .catch((err) => {
        setError(err.message);
        setSuccess(false);
      });
  };

    const handleGoogleSignIn = (event) => {
      event.preventDefault();
  
      signInWithGoogle(provider)
        .then(() => {
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
        <title>Sign up</title>
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left mb-4">
            <h1 className="text-4xl font-bold">Register your account!</h1>
          </div>

          <div className="card bg-base-300 w-full max-w-sm shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                    required
                  />
                  {nameError && (
                    <p className="text-red-400">
                      Atleast 6 or upper letters can be valid
                    </p>
                  )}

                  <label className="label">Photo URL</label>
                  <input
                    type="photo"
                    name="photo"
                    className="input"
                    placeholder="Photo URL"
                    required
                  />

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

                  <button
                    type="submit"
                    className="py-1.5 rounded-md text-[18px] mt-4 bg-base-100 max-w-[320px] shadow-sm shadow-amber-900 cursor-pointer"
                  >
                    Register
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
                    <Link className="font-bold" to="/login">
                      Log in
                    </Link>
                  </p>
                </fieldset>

                {success && (
                  <p className="text-green-400 mt-3 text-center">
                    Successfully created! Please log in
                  </p>
                )}
                {error && (
                  <p className="bg-error rounded-2xl mt-3 text-center">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;
