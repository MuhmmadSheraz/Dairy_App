import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Interfaces/user.interface";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    },
    removerUserData: (state: any) => {
      state.user = null;
    },
  },
});
export const { setUser, removerUserData } = userSlice.actions;
export default userSlice.reducer;
