import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Home from "./Home";
// import AppliedProjects from "../AppliedProjects/AppliedProjects";

const LoginPage = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route  path="/" element={<RegisterPage/>}/>
            <Route  path="/home" element={<Home/>}/>
            {/* <Route path="/applied-projects" element={<AppliedProjects />} /> */}
        </Routes>

      </div>
    </BrowserRouter>
  );
};

export default LoginPage;
