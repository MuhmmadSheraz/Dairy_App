import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import http from "../../services/api";
import { EntryType } from "../../types/types";
interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}
export const addEntryReducer: any = createAsyncThunk(
  "RandomEntry",
  async (obj: EntryType) => {
    const response = await http.post(`/diaries/entry/${obj.id}/`, obj);
    return await response;
  }
);
export const upadteEntryReducer: any = createAsyncThunk(
  "EditEntry",
  async (obj: EntryType) => {
    const response = await http.put(`/diaries/entry/${obj.id}/`, obj);
    return await response;
  }
);
export const entrySlice = createSlice({
  name: "Entry Slice",
  initialState: {
    entries: [],
  },
  reducers: {
    removeEntries: (state: any) => {
      state.entries = [];
    },
    addAllEntries: (state: any, { payload }: PayloadAction | any) => {
      let data = payload.map((x: any) => {
        if (!state.entries.includes(x.id)) {
          return x;
        }
      });
      state.entries = data;
    },
  },
  extraReducers: {
    [addEntryReducer.fulfilled]: (state: any, action: any) => {
      const data: any = action.payload;
      const newObj = Object.assign({}, data);
      state.entries = [...state.entries, newObj.entry];
      // }
    },
    [addEntryReducer.pending]: (state: any, { payload }: PayloadAction) => {
      return console.log("Pending ");
    },
    [addEntryReducer.reject]: (state: any, { payload }: PayloadAction) => {
      return console.log("Error Found ");
    },
    [upadteEntryReducer.fulfilled]: (
      state: any,
      { payload }: PayloadAction
    ) => {
      const data: any = payload;
      const { id } = data;
      const index = state.entries.findIndex((e: any) => e.id === id);
      if (index !== -1) {
        state.entries.splice(index, 1, data);
      }
      // }
    },
    [upadteEntryReducer.pending]: (state: any, action: any) => {
      return console.log("Pending ");
    },
    [upadteEntryReducer.reject]: (state: any, action: any) => {
      return console.log("Error Found ");
    },
  },
});
export const { removeEntries, addAllEntries } = entrySlice.actions;
export default entrySlice.reducer;
