import React, { useState } from "react";
import { auth, db } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { setDoc, doc,getDoc } from "firebase/firestore";
import { useAuth } from "../../AuthContext";
 {/* Register and login Screen  */}

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
            setUserName(userDoc.data().displayName);
          }
        }
        history("/home");
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
          className={login == false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          Signup
        </div>
        <div
          className={login == true ? "activeColor" : "pointer"}
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
              {login == false ? (
                <input type="text" name="name" placeholder="Enter you name " />
              ) : (
                ""
              )}
            </div>
            <input type="email" name="email" placeholder="Enter Your Email " />{" "}
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              autocomplete="on"
            />
            <br />
            <button> {login ? "signIn" : "signUp"}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
