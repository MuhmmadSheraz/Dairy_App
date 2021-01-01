import Diary from "../Diary";
import "./diary.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface state {
  authReducer: {};
  dairyReducer: {
    diaries: [];
  };
  entryReducer: {
    entries: {};
  };
  userReducer: {};
}
interface diary {
  createdAt: string;
  entryIds: null;
  id: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
}
const Dairies = () => {
  const [diaries, setDiaries]: any = useState<diary[]>([]);
  const data = useSelector((state: state) => {
    return state.dairyReducer.diaries;
  });
  useEffect(() => {
    setDiaries(data);
  }, [data]);
  if (diaries.length === 0) {
    return (
      <div className="diaryContentWrapper ">
        <h1 className="text-warning text-center">No Diaries Added</h1>
      </div>
    );
  }
  return (
    <div className="diariesWrapper text-center" style={{ margin: "0 auto" }}>
      <div className="container-fluid text-center" style={{ margin: "0 auto" }}>
        <div className="row  no-gutters    pt-3">
          {diaries &&
            diaries.map((item: diary, index: string) => {
              if (item.type === "Public") {
                return (
                  <div className="col-md-3 p-0 m-1 diaryBox" key={index}>
                    <Diary data={item} editable={false} />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default Dairies;
