import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Interfaces/user.interface";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log("action.payload from Reducer===>", action.payload);
      return (state = action.payload);
    },
    removerUserData: (state: any): any => {
      state.user = null;
      console.log("remove User", state);
    },
  },
});
export const { setUser, removerUserData } = userSlice.actions;
export default userSlice.reducer;
