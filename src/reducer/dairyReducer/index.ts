import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import http from "../../services/api";
import { DiaryType, stateType } from "../../types/types";

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
  async (obj: DiaryType) => {
    const response = await http.post(`/diaries/`, obj);
    return await response;
  }
);
export const updateDiaryContent: any = createAsyncThunk(
  "/s",
  async (obj: DiaryType) => {
    const response = await http.put(`/diaries/${obj.id}`, obj);
    return response;
  }
);
export const DairySlice = createSlice({
  initialState: {
    diaries: [],
  },
  name: "DairySlice",
  reducers: {
    addDairyData: (state, { payload }: PayloadAction) => {
      const data: any = payload;
      state.diaries = data;
    },
    removeDiaries: (state): stateType | any => {
      state.diaries = [];
    },
  },
  extraReducers: {
    [postDiary.fulfilled]: (state: any, { payload }: PayloadAction | any) => {
      const data: any = payload.diary;
      const newObj = Object.assign({}, data);
      state.diaries = [...state.diaries, newObj];
      // }
    },
    [postDiary.pending]: (state: any, { payload }: PayloadAction) => {
      return console.log("Pending ");
    },
    [postDiary.reject]: (state: any, { payload }: PayloadAction) => {
      return console.log("Error Found ");
    },
    [updateDiaryContent.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      const data: any = payload;
      const { id } = data;
      const newObj = Object.assign({}, data);
      const diaryIndex = current(state.diaries).findIndex(
        (diary: any) => diary.id === id
      );

      // const diaryIndex = current(state.diaries).find((diary: any) => id === id);
      if (diaryIndex !== -1) {
        state.diaries.splice(diaryIndex, 1, data);
      }
      // state.splice(diaryIndex, 1, data);

      // state.diaries = [...state.diaries, newObj];
      // }
    },
    [updateDiaryContent.pending]: (state: any, { payload }: PayloadAction) => {
      return console.log("Pending ");
    },
    [updateDiaryContent.reject]: (state: any, action: any) => {
      return console.log("Error Found ");
    },
  },
});

export const { addDairyData, removeDiaries } = DairySlice.actions;
export default DairySlice.reducer;
