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
    return state.authReducer.isAuthenticated;
  });
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(data);
  }, [data]);
  return (
    <Router>
      <Route exact path="/">
        {isLogin ? <Redirect to="/home" /> : <Login />}
      </Route>
      <Route path="/home">
        <Navbar />
        {!isLogin ? <Redirect to="/" /> : <Home />}
      </Route>
      {/* <Navbar />   */}
      <Route path="/diary/:id/">
        <Navbar />
        {/* {!isLogin ? <Redirect to="/" /> : <DiaryContent />} */}
        <DiaryContent />
      </Route>
      <Route path="/myDiaries/">
        {/* {!isLogin ? <Redirect to="/" /> : <MyDiaries />} */}
        <MyDiaries />
      </Route>
    </Router>
  );
}
