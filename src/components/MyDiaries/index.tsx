import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DiaryType, stateType } from "../../types/types";
import Diary from "../Diary";
import Navbar from "../Navbar";
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
    console.log(user);
    console.log(data);
    const mine = data.filter((x: DiaryType) => x.userId === user.id);
    console.log(mine);
    setDiaries(mine);
  }, [data]);
  return (
    <div className="diaryContentWrapper ">
      <Navbar />

      <div className="row  no-gutters justify-content-center pt-3">
        {diaries &&
          diaries.map((item: diary, index: string) => {
            if (item.type === "Public") {
              return (
                <div className="col-md-3 p-0 m-1 " key={index}>
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
