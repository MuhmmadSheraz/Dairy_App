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
    console.log("typeeeeeeeeeeeeeee===>", state);
    return state.dairyReducer.diaries;
  });
  useEffect(() => {
    console.log("object--------------------------");
    setDiaries(data);
    console.log("diaries", data);
  }, [data]);
  return (
    <div className="diariesWrapper text-center" style={{ margin:"0 auto" }}>
      <div
        className="container-fluid text-center"
        style={{ margin:"0 auto" }}
      >
        <div className="row  no-gutters    pt-3">
          {diaries &&
            diaries.map((item: diary, index: string) => {
              if (item.type === "Public") {
                return (
                  <div className="col-md-3 p-0 m-1 " key={index} >
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
