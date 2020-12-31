import { useState, useEffect } from "react";
import "./auth.css";
import logo from "../../assests/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { saveToken } from "../../reducer/authReducer";
import { setUser } from "../../reducer/userReducer";
import http from "../../services/api";
import { User } from "../../Interfaces/user.interface";
import { AuthResponse } from "../../services/mirage/routes/user";
import Loader from "../Loader";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("email@email.com");
  const [password, setPassword] = useState<string>("1025454545454");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();
  interface userSide {
    token: string;
    user: {
      diaryIds: null;
      email: string;
      id: string;
      password: string;
      userName: "a";
    };
  }

  let obj = {
    userName,
    email,
    password,
    id: Math.floor(Math.random() * 100),
  };
  const login = () => {
    if (userName === "" || password === "") {
      return Swal.fire({
        icon: "warning",
        text: "Please Fill All The Fields",
      });
    }
    setLoader(true);
    const path = "/auth/login";
    http.post<User | AuthResponse>(path, obj).then((res: userSide | any) => {
      console.log("res Login==>", res);
      dispatch(
        setUser({
          user: res.user,
        })
      );
      dispatch(
        saveToken({
          token: res.token,
          isAuthenticated: true,
        })
      ); //Token
    });
    setLoader(false);
    // setLoader(true);
    // navigate.push("/home");
    // console.log(email, password, userName);

    // console.log("stateData==>", stateData);
    setUserName("");
    setEmail("");
    setPassword("");
    // history.push("/home");
  };

  const signUp = () => {
    if (userName === "" || email === "" || password === "") {
      return Swal.fire({
        icon: "warning",
        text: "Please Fill All The Fields",
      });
    }
    setLoader(true);
    const path = "/auth/signup";
    http.post<User | AuthResponse>(path, obj).then((res: userSide | any) => {
      console.log("res SignUp", res);
      dispatch(
        setUser({
          user: res.user,
        })
      );
      dispatch(
        saveToken({
          token: res.token,
          isAuthenticated: true,
        })
      ); //Token
    });
    // history.push("/home");
    // setLoader(false);
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="AuthWrapper">
      <div className="cardWrapper pt-5">
        <div className="authcard p-5">
          {/* <img className="imageWrapper appLogo" src={logo} alt="AppLogo" /> */}
          {isLogin ? <h2>Login</h2> : <h2>Sign Up</h2>}
          <div className="py-2">UserName</div>
          <input
            className="inputBox"
            type="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName"
          />
          <div className="py-2">E-mail Address</div>
          <input
            className="inputBox"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Optional "
          />
          <div className="py-2">Password</div>
          <input
            className="inputBox"
            placeholder="Password"
            type="password  "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin ? (
            <button className="mt-3 btnLogin btn btn-block" onClick={login}>
              Login
            </button>
          ) : (
            <button className="mt-3 btn btn-info btn-block" onClick={signUp}>
              Sign Up
            </button>
          )}
          {isLogin ? (
            <div className="text-center pt-3 ">
              Don't Have Accout?{" "}
              <span
                className="text-primary hoverMe"
                onClick={() => setIsLogin(false)}
              >
                Create One
              </span>
            </div>
          ) : (
            <div className="text-center pt-3 ">
              Already Have An Accoun?
              <span
                className="text-primary hoverMe"
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
