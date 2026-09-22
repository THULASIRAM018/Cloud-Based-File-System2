// import React from 'react'
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
// import Sample from "./Pages/Sample";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import SideBar from "./Component/SideBar/SideBar";
import DashBoard from "./Pages/DashBoard";
import FilePreview from "./Pages/FilePreview";
import StarredFiles from "./Pages/StarredFiles";
import { ProtectedRoute } from "./AuthMiddleware";

function UserLayout() {
  return (
    <SideBar>
      <Outlet />
    </SideBar>
  );
}

function App() {
  return (
    <div>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/preview/*" element={<FilePreview />} />
          <Route path="/*" element={<UserLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="dashboard/:username" element={<DashBoard />} />
            <Route path="starred" element={<StarredFiles />} />
=======
        <Route element={<Home />} path="/" />//Home Page
        <Route element={<Login />} path="/login" />//Login Page to login using username and password
        <Route element={<SignUp />} path="/register" />//Sign up page using username,email,password
        <Route element={<ProtectedRoute />}>//protect from unauthorised access
          <Route element={<FilePreview />} path="/preview/*" />//view preview of files
          <Route path="/*" element={<UserLayout />}>//outlet SideBar
            <Route element={<DashBoard />} path="dashboard/*" />
            //to list files and folders of directory and create folder, upload files,delete and download files and folders
            <Route element={<StarredFiles />} path="starred" />//to list starred files
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
