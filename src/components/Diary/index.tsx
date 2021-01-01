import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../services/api";
import "./diary.css";
import { addEntryReducer } from "../../reducer/entryReducer";
import { FaLock } from "react-icons/fa";
import { MdPublic } from "react-icons/md";

interface diary {
  createdAt: string;
  entryIds: null;
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
const Diary = ({ data, editable }: { data: diary; editable: boolean }) => {
  const history = useHistory();

  return (
    <div
      className="DiaryCard"
      onClick={() => history.push(`/diary/${data.id}/`)}
    >
      <h2 className="text-white px-2 py-2 text-left">{data.title}</h2>
      <p className="text-info">
        Created At: <span className="text-white">{data.createdAt}</span>{" "}
      </p>
      <p className="text-warning">
        Updated At: <span className="text-white">{data.updatedAt}</span>{" "}
      </p>
      {data.type === "Public" ? (
        <MdPublic size={20} style={{ color: "white", textAlign: "right" }} />
      ) : (
        <FaLock size={20} style={{ color: "white", textAlign: "right" }} />
      )}
    </div>
  );
};

export default Diary;
