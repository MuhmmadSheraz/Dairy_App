import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DiaryType, stateType } from "../../types/types";
import Diary from "../Diary";
import Navbar from "../Navbar";
import { FaLock } from "react-icons/fa";

interface diary {
  createdAt: string;
  entryIds: null;
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
const MyDiaries = () => {
  const [diaries, setDiaries] = useState<any>([]);
  const data = useSelector((state: stateType) => {
    return state.dairyReducer.diaries;
  });
  const user = useSelector((state: stateType | any) => {
    return state.userReducer.user;
  });
  useEffect(() => {
    const mine = data.filter((x: DiaryType) => x.userId === user.id);
    setDiaries(mine);
  }, [data]);
  if (diaries.every((x: DiaryType) => x.type !== "private")) {
    return (
      <div className="diaryContentWrapper ">
        <Navbar />
        <h1 className="text-warning text-center">No Private Diaries Added</h1>
      </div>
    );
  }
  return (
    <div className="diaryContentWrapper ">
      <Navbar />

      <div className="row  no-gutters justify-content-center pt-3">
        {diaries &&
          diaries.map((item: diary, index: string) => {
            if (item.type === "private") {
              return (
                <div className="col-md-3 p-0 m-1 DiaryBox" key={index}>
                  <Diary data={item} editable={false} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default MyDiaries;
