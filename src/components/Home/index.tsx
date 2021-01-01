import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import http from "../../services/api";
import Dairies from "../Dairies";
import { postDiary } from "../../reducer/dairyReducer";
import { param } from "jquery";
import Navbar from "../Navbar";
import Swal from "sweetalert2";
import { User } from "../../Interfaces/user.interface";
import { stateType } from "../../types/types";
export interface AuthResponse {
  token: string;
  user: User;
}
const Home = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [scope, setScope] = useState<any>("");
  const [user, setUser] = useState<AuthResponse | User | any>();
  const authUser: any = useSelector<AuthResponse | User | any>((state) => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);
  const toggle = () => {
    setModal(!modal);
  };
  const create = async () => {
    if (title === "" || scope === "") {
      return Swal.fire({
        icon: "warning",
        text: "Please Fill All The Fields",
      });
    }
    let obj = {
      title: title,
      type: scope,
      userId: user.user.id,
      diaryId: Math.floor(Math.random() * 100),
    };
    await dispatch(postDiary(obj));
    Swal.fire({
      icon: 'success',
      title: 'Diary Created.',
    })
    toggle();
  };

  return (
    <div className="homeWrapper">
      <Dairies />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Dairy</ModalHeader>
        <ModalBody>
          <label className="font-weight-bold">Dairy Name</label>
          <br />
          <input
            className="input"
            placeholder="Enter Dairy Name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <div className="mt-3">
            <input
              type="radio"
              id="public"
              name="scope"
              value="Public"
              className="radio"
              onChange={(e) => setScope(e.target.value)}
            />
            <label style={{ fontSize: "18px" }}>Public</label>
            <input
              type="radio"
              id="private"
              name="scope"
              value="private"
              className="radio"
              onChange={(e) => setScope(e.target.value)}
            />
            <label style={{ fontSize: "18px" }}>Private</label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={create}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <button className="float" onClick={toggle}>
        ADD
      </button>
    </div>
  );
};

export default Home;
