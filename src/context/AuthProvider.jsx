import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signupWithEmailAndPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinWithAndPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider)
  }

   const updateUser= (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {displayName:name,photoURL:photo})
  }

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth)
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        setLoading(false)
    })
    return () => {
    unSubscribe()
    }
  }, [])

  const info = {
    user,
    loading,
    signupWithEmailAndPass,
    signinWithAndPass,
    signInWithGoogle,
    updateUser,
    signOutUser
  };
  return (
     <AuthContext value={info}>
  {children}
  </AuthContext>
  )
};

export default AuthProvider;
