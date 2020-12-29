import Diary from "../Diary";
import "./diary.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Dairies = () => {
  const [diaries, setDiaries] = useState<any>([]);
  const data = useSelector((state: any) => {
    return state.dairyReducer.diaries;
  });
  useEffect(() => {
    console.log("object--------------------------");
    setDiaries(data);
    console.log("diaries", data);
  }, [data]);
  return (
    <div className="container-fluid">
      <div className="row">
        {diaries &&
          diaries.map((item: any, index: string) => {
            if (item.type === "Public") {
              return (
                <div className="col-md-4" key={index}>
                  <Diary data={item} editable={false} />
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Dairies;
