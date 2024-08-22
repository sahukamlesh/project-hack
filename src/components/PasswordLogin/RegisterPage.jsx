import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../AuthContext";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const { setUserName } = useAuth();

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name?.value;

    try {
      setIsLoading(true);
      if (type === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: name,
            isAdmin: false, // Default to false, set true if needed
          });
          setUserName(name);
          history("/home");
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.displayName);
            if (userData.isAdmin) {
              history("/admin"); // Redirect to admin dashboard if admin
            } else {
              history("/home");
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-md p-4">
        <div className="flex justify-center mb-4">
          <button
            className={`${
              login ? "bg-gray-700" : "bg-orange-500 text-white"
            } py-2 px-4 rounded`}
            onClick={() => setLogin(false)}
          >
            Signup
          </button>
          <button
            className={`${
              login ? "bg-orange-500 text-white" : "bg-gray-700"
            } py-2 px-4 rounded`}
            onClick={() => setLogin(true)}
          >
            Signin
          </button>
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{login ? "Signin" : "Signup"}</h3>
        <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
          <div className="mb-4">
            {!login && (
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full p-2 pl-10 text-sm text-black-400"
              />
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-full p-2 pl-10 text-sm text-black-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="w-full p-2 pl-10 text-sm text-black-400"
            />
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {login ? "Signin" : "Signup"}
          </button>
        </form>
        {isLoading && (
          <div className="text-center mt-4">
            <h1 className="text-white">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;