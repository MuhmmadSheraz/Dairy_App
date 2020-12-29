import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import http from "../../services/api";
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
  async (obj: any) => {
    console.log("Thunk Called For Entry", obj);
    const response = await http.post(`/diaries/entry/${obj.id}/`, obj);
    console.log("await response.json()===>", await response);
    return await response;
  }
);
export const entrySlice = createSlice({
  name: "Entry Slice",
  initialState: {
    entries: [],
  },
  reducers: {},
  extraReducers: {
    [addEntryReducer.fulfilled]: (state: any, action: any) => {
      const data: any = action.payload;
      console.log("data Of entry===>", data);
      const newObj = Object.assign({}, data);
      state.entries = [...state.entries, newObj.entry];
      // }
    },
    [addEntryReducer.pending]: (state: any, action: any) => {
      return console.log("Pending ");
    },
    [addEntryReducer.reject]: (state: any, action: any) => {
      return console.log("Error Found ");
    },
  },
});
export default entrySlice.reducer;