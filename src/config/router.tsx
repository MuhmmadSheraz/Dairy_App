import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  // Redirect,
} from "react-router-dom";
import { Login } from "../components/Auth/index";
import Home from "../components/Home/index";
import { connectAdvanced, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import DiaryContent from "../components/DiaryContent";
import MyDiaries from "../components/MyDiaries";

export default function MainRouter() {
  const data = useSelector((state: any) => {
    console.log(state);
    return state.authReducer.isAuthenticated;
  });
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    console.log("Navbarr===>", data);
    setIsLogin(data);
    console.log("navbar 222", isLogin);
  }, [data]);
  console.log(data);
  return (
    <Router>
      <Route exact path="/">
        {isLogin ? <Redirect to="/home" /> : <Login />}
      </Route>
        <Navbar />
      <Route path="/home">
        {!isLogin ? <Redirect to="/" /> : <Home />}
      </Route>
      {/* <Navbar />   */}
      <Route path="/diary/:id/">
        <DiaryContent />
      </Route>
      <Route path="/myDiaries/">
        <MyDiaries />
      </Route>
    </Router>
  );
}
