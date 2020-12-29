import "./diaryContent.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addEntryReducer } from "../../reducer/entryReducer";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import { Button, ModalFooter } from "reactstrap";
import { updateDiaryContent } from "../../reducer/dairyReducer";
import dayjs from "dayjs";
const DiaryContent = () => {
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState<boolean>();
  const [diary, setDiary] = useState<any>();
  const [entry, setEntry] = useState<any>([]);
  // Editabel States
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [scope, setScope] = useState<any>("");

  const allDiaries = useSelector((state: any) => {
    return state.dairyReducer.diaries;
  });
  const user = useSelector((state: any) => {
    return state.userReducer.user;
  });
  const entries = useSelector((state: any) => {
    return state.entryReducer.entries;
  });
  const { id }: any = useParams();

  const obj = {
    title: "hello I am entry",
    content: "hello I am entry COntent",
    id: id,
  };
  useEffect(() => {
    console.log("Address  Baaar", id);
    console.log("all Diaries===>:", allDiaries);
    let targetDiary = allDiaries.filter((x: any) => x.id === id);
    const myEntries = entries.filter((x: any) => x.diaryId === id);
    console.log("diary Target", targetDiary[0]);
    setDiary(targetDiary[0]);
    setTitle(targetDiary[0].title);
    setScope(targetDiary[0].type);
    console.log("myEntries===>", myEntries);
    setEntry(myEntries);
    console.log("ALl ENTRIES+++", entries);
    console.log("Targettted  diaries+++", allDiaries);

    if (targetDiary[0] && targetDiary[0].userId === user.id) {
      setIsEditable(true);
      console.log("isEditable====================>", isEditable);
    }
    console.log("Diary to be consoled", diary);
    console.log("Entry111111111111111", entry);
  }, [allDiaries, entries]);

  const toggle = () => {
    console.log("User************", user);
    setModal(!modal);
  };

  const updateDiary = () => {
    const now = dayjs().format();

    let obj = {
      title,
      type: scope,
      createdAt: diary.createdAt,
      updatedAt: now,
      id: diary.id,
    };
    dispatch(updateDiaryContent(obj));
    toggle();
  };
  return (
    <div className="diaryContentWrapper">
      {diary && diary ? (
        <div className="nameWrapper container">
          <h1 className="text-white p-5">{diary.title}'s Entries</h1>
          <span className="p-5">
            <button
              className="btn btn-success"
              onClick={() => dispatch(addEntryReducer(obj))}
            >
              Add Entry
            </button>
          </span>
        </div>
      ) : (
        ""
      )}
      {/* Editable Sectiomn */}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Dairy</ModalHeader>
        <ModalBody>
          <label className="font-weight-bold">Dairy Name</label>
          <br />
          <input
            className="input"
            placeholder="Enter Dairy Name"
            value={title}
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
          <Button color="primary" onClick={updateDiary}>
            Update
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {isEditable ? (
        <h2 className="text-success" onClick={toggle}>
          Edit Karo
        </h2>
      ) : (
        ""
      )}
      <div className="container pb-5">
        <div id="accordion">
          <Accordion allowZeroExpanded>
            {entry.map((item: any) => (
              <AccordionItem key={item.id}>
                <AccordionItemHeading>
                  <AccordionItemButton>{item.title}</AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel
                  style={{ backgroundColor: "#272B2F", color: "white" }}
                >
                  {item.content}
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DiaryContent;
