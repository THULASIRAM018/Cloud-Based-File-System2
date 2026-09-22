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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/preview/*" element={<FilePreview />} />
          <Route path="/*" element={<UserLayout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="dashboard/:username" element={<DashBoard />} />
            <Route path="starred" element={<StarredFiles />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
