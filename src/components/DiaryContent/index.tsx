import "./diaryContent.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addEntryReducer,
  upadteEntryReducer,
} from "../../reducer/entryReducer";
import { FaPencilAlt } from "react-icons/fa";

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
import { Button, Form, FormGroup, Input, Label, ModalFooter } from "reactstrap";
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
  const [entryName, setEntryName] = useState("");
  const [scope, setScope] = useState<any>("");
  const [entryModal, setEntryModal] = useState(false);
  const [entryContent, setEntryContent] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [state, setState] = useState(true);
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

  // const obj = {
  //   title: "hello I am entry",
  //   content: "hello I am entry COntent",
  //   id: id,
  // };
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
    setModal(!modal);
  };
  const toggleEntryModal = (id: any) => {
    console.log(state, id);
    if (id == null) {
      entryModal ? setEntryModal(false) : setEntryModal(true);
    } else if (state === false) {
      console.log(currentId);
      let entryFilterd = entry.filter((x: any) => x.id === id);
      console.log(entryFilterd);
      setEntryName(entryFilterd[0].title);
      setEntryContent(entryFilterd[0].content);
    }
    {
      entryModal ? setEntryModal(false) : setEntryModal(true);
    }
    // setEntryName("
  };
  const updateDiary = () => {
    const now = dayjs().format();
    console.log("Update Func=======");
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
  const updateEntry = () => {
    let obj = {
      title: entryName,
      content: entryContent,
      id: currentId,
    };
    dispatch(upadteEntryReducer(obj));
    console.log("Edited  Entry==>", obj);
    // toggleEntryModal();
    setEntryModal(false);
  };
  const createEntry = async () => {
    console.log("Entry Created 11");
    let obj = {
      title: entryName,
      content: entryContent,
      id: id,
    };
    console.log("Edited  Entry==>", obj);
    await dispatch(addEntryReducer(obj));
    setEntryModal(false);
  };
  const openEditor = (id: any) => {
    console.log("Entry ID", id);
    if (id === null) {
      setEntryModal(true);
      setState(true);
      setEntryName("");
      setEntryContent("");
    } else {
      setCurrentId(id);
      console.log("Open Edit Entry");
      setState(false);
      toggleEntryModal(id);
      // setdiaryModal(true);
    }
    // console.log(state);
    // console.log("diaryModalppppppppppppppppppppppppppppppppppp", diaryModal);
    // toggle();
    // setdiaryModal(false);
  };
  return (
    <div className="diaryContentWrapper">
      {diary && diary ? (
        <div className="nameWrapper container">
          {isEditable ? (
            <div className="text-white p-5 d-flex" onClick={updateDiary}>
              <h1 className="myDIV">{diary.title}'s Entries</h1>{" "}
              <span className="hide p-1">
                <FaPencilAlt style={{ color: "white" }} size={20} />
              </span>
            </div>
          ) : (
            <div className="text-white p-5 d-flex">
              <h1 className="">{diary.title}'s Entries</h1>{" "}
            </div>
          )}
          <span className="p-5">
            <button
              className="btn btn-success"
              onClick={() => openEditor(null)}
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
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Entry Modal */}
      <Modal isOpen={entryModal} toggle={() => toggleEntryModal(null)}>
        <ModalHeader toggle={() => toggleEntryModal(null)}>
          Update Entry
        </ModalHeader>
        <ModalBody>
          <label className="font-weight-bold">Entry Name</label>
          <br />
          <input
            className="input"
            placeholder="Enter Dairy Name"
            value={entryName}
            onChange={(e) => setEntryName(e.target.value)}
          />
          <br />
          <FormGroup className="py-3">
            <Label for="exampleText" className="font-weight-bold">
              Entry Content
            </Label>
            <Input
              onChange={(e) => setEntryContent(e.target.value)}
              type="textarea"
              value={entryContent}
              placeholder="Enter Your Thoughts"
              name="text"
              id="exampleText"
              rows="10"
              cols="50"
              style={{ overflow: "auto" }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {state ? (
            <Button color="success" onClick={createEntry}>
              Add Entry
            </Button>
          ) : (
            <Button color="primary" onClick={updateEntry}>
              Update
            </Button>
          )}
          <Button color="secondary" onClick={() => toggleEntryModal(null)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div className="container pb-5">
        <div id="accordion">
          <Accordion allowZeroExpanded>
            {entry.map((item: any) => (
              <AccordionItem key={item.id}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      {item.title}{" "}
                      {isEditable ? (
                        <FaPencilAlt
                          onClick={() => openEditor(item.id)}
                          className="titleIcon"
                          style={{ color: "black", float: "right" }}
                          size={20}
                        />
                      ) : (
                        ""
                      )}
                    </span>
                  </AccordionItemButton>
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
