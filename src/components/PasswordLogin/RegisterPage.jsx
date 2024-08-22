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
    <div>
      <div className="row">
        <div
          className={login === false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          Signup
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h3>{login ? "SignIn" : "SignUp"}</h3>

      <div>
        {isLoading ? (
          <h1>Loading....</h1>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
            <div>
              {!login && (
                <input type="text" name="name" placeholder="Enter your name " />
              )}
            </div>
            <input type="email" name="email" placeholder="Enter Your Email " />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              autoComplete="on"
            />
            <br />
            <button>{login ? "SignIn" : "SignUp"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
