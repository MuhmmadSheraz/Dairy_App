import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { User } from "../../Interfaces/user.interface";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: null as User | null,
  reducers: {
    setUser: (state, action) => {
        console.log("action.payload from Reducer===>",action.payload)
      return (state = action.payload);
    },
  },
});
export const {setUser}= userSlice.actions
export default userSlice.reducer