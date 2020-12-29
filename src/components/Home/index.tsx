import React, { useState, useEffect } from "react";
import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import http from "../../services/api";
import Dairies from "../Dairies";
import { postDiary } from "../../reducer/dairyReducer";
import { param } from "jquery";
const Home = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [scope, setScope] = useState<any>("");
  const [user, setUser] = useState<any>("");
  const authUser: any = useSelector<any>((state) => {
    return state.userReducer;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Home render===>")
    setUser(authUser);
  }, [authUser]);
  const toggle = () => {
    console.log("User************", user);
    setModal(!modal);
  };
  const create = async () => {
    // New**************************
    let obj = {
      title: title,
      type: scope,
      userId: user.user.id,
    };
    await dispatch(postDiary(obj));
    toggle();

    // http.post("/diaries/", obj).then((e: any) => {
    //   console.log("Dairy Response", e);
    //   // dispatch(addDairy(e));
    //   const { user, diary } = e;
    //   // dispatch(getDiaries(diary.userId));
    //   // getDairies(diary.userId);
    //   return Swal.fire({
    //     titleText: "All done!",
    //     confirmButtonText: "OK!",
    //   });
    // });
    // if (diary && user) {
    //   console.log("Dairy And User", diary, user);

    // }
  };
  const getDairies = (a: any) => {
    console.log("API param", a);
    http.get(`/diaries/${a}`).then((e) => {
      console.log(e);
    });
  };

  return (
    <div className="homeWrapper">
      <Dairies />
      {/* <button onClick={getDairies}>get All </button> */}
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
