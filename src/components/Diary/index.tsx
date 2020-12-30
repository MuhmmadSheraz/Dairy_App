import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../services/api";
import "./diary.css";
import { addEntryReducer } from "../../reducer/entryReducer";
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
    </div>
  );
};

export default Diary;
{
  /* <Link to="/diary">
       Diary
     </Link> */
}
{
  /* <p>Updated At: {data.updatedAt}</p> */
}
{
  /* <p className="text-muted">Created At {data.createdAt}</p> */
}
{
  /* <p className="text-muted">Updated At {data.updatedAt}</p> */
}
{
  /* Diary Type <span className="text-info mx-2">{data.type}</span>
      <button className="btn btn-success" onClick={() => addEntry(data.id)}>
        Add Entry
      </button>
      <button className="btn btn-success" onClick={() => getEntry(data.id)}>
        Get Entry
      </button> */
}
