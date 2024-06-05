/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from "./page/Registers";
import Login from "./page/Login";
import Admin from "./page/admin/admin";
import Adminpostpag from "./page/admin/adminpostpag";
import Home from "./page/user/Home";
import Editor from "./page/editor/editor";
import View from "./page/user/view";
import Contact from "./page/contact";
import "./App.css";

function PrivateRoute({ children }) {
  return sessionStorage.getItem("isAuthenticated") ? (
    children
  ) : (
    <Navigate to="/" />
  );
}

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Toaster position="top-left" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/editor"
              element={
                <PrivateRoute>
                  <Editor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path="/post"
              element={
                <PrivateRoute>
                  <Adminpostpag />
                </PrivateRoute>
              }
            />
            <Route
              path="/view"
              element={
                <PrivateRoute>
                  <View />
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
