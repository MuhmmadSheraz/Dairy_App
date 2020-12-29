import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import http from "../../services/api";

//Interfaces
interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>;

export const postDiary: any = createAsyncThunk(
  "/diaries/:id",
  async (obj: any) => {
    console.log("Thunk Called", obj);
    const response = await http.post(`/diaries/`, obj);
    console.log("await response.json()===>", await response);
    return await response;
  }
);
export const updateDiaryContent: any = createAsyncThunk(
  "/s",
  async (obj: any) => {
    console.log("Thunk Called For Update Diary", obj);
    const response = await http.put(`/diaries/${obj.id}`, obj);
    console.log("await response.json()===>", await response);
    return await response;
  }
);
export const DairySlice = createSlice({
  initialState: {
    diaries: [],
  },
  name: "DairySlice",
  reducers: {
    addDairyq: (state, { payload }): any => {
      console.log("Action PayLoad ==>", payload);
      const data: any[] = payload.diary;
    },
  },
  extraReducers: {
    [postDiary.fulfilled]: (state: any, action: any) => {
      const data: any = action.payload.diary;
      const newObj = Object.assign({}, data);
      state.diaries = [...state.diaries, newObj];
      // }
    },
    [postDiary.pending]: (state: any, action: any) => {
      return console.log("Pending ");
    },
    [postDiary.reject]: (state: any, action: any) => {
      return console.log("Error Found ");
    },
    [updateDiaryContent.fulfilled]: (state: any, action: any) => {
      console.log("Param Info ====>", action.payload);
      const data: any = action.payload;
      const { id } = data;
      const newObj = Object.assign({}, data);
      const diaryIndex = state.diaries.find((diary: any) => diary.id === id);
      console.log("find Data===>", diaryIndex);
      if (diaryIndex !== -1) {
        console.log("find Data===>", diaryIndex);
        state.diaries.splice(diaryIndex, 1, newObj);
      }
      // state.splice(diaryIndex, 1, data);

      // state.diaries = [...state.diaries, newObj];
      // }
    },
    [updateDiaryContent.pending]: (state: any, action: any) => {
      return console.log("Pending ");
    },
    [updateDiaryContent.reject]: (state: any, action: any) => {
      return console.log("Error Found ");
    },
  },
});

export const { addDairyq } = DairySlice.actions;
export default DairySlice.reducer;
