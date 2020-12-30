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
    return response;
  }
);
export const DairySlice = createSlice({
  initialState: {
    diaries: [],
  },
  name: "DairySlice",
  reducers: {
    addDairyData: (state, { payload }): any => {
      console.log("Action PayLoad ==>", payload);
      const data: any = payload;
      console.log("data forom Reducer", data);
      state.diaries = data;
    },
    removeDiaries: (state): any => {
      state.diaries = [];
      console.log("remove User", state);
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
      console.log("State Diarieeeeeeeeeeees", current(state.diaries));
      const diaryIndex = current(state.diaries).findIndex((diary: any) => diary.id === id);

      // const diaryIndex = current(state.diaries).find((diary: any) => id === id);
      console.log("find Data===>", diaryIndex);
      if (diaryIndex !== -1) {
        console.log("find Data===>", diaryIndex);
        state.diaries.splice(diaryIndex, 1, data);
        console.log("List===>", current(state.diaries));
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

export const { addDairyData, removeDiaries } = DairySlice.actions;
export default DairySlice.reducer;
