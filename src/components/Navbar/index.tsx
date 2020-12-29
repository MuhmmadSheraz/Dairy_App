import React from "react";
import "./navbar.css";
import { removeUser } from "../../reducer/authReducer/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state;
  });
  const logout = () => {
    console.log("Logging Out", data);
    dispatch(removeUser());
  };
  return (
    <div style={{ width: "100vw" }}>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <a className="navbar-brand font-weight-bold text-white" href="#">
          DiaryApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>

            <Link to="/myDiaries/">
              <li className="nav-item">
                <a className="nav-link">My Diaries</a>
              </li>
            </Link>

            <li className="nav-item">
              <a className="nav-link" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;