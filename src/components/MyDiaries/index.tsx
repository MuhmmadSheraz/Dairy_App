import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Diary from "../Diary";

const MyDiaries = () => {
  const [diaries, setDiaries] = useState<any>([]);
  const data = useSelector((state: any) => {
    return state.dairyReducer.diaries;
  });
  const user = useSelector((state: any) => {
    return state.userReducer.user;
  });
  useEffect(() => {
    const mine = data.filter((x: any) => x.userId === user.id);
    setDiaries(mine);
  }, [data]);
  return (
    <div className="diaryContentWrapper">
      {diaries &&
        diaries.map((item: any, index: string) => {
          return <Diary data={item} editable={true} />;
        })}
    </div>
  );
};

export default MyDiaries;
