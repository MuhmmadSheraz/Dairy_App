import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};
export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    saveToken: (state, { payload }: any) => {
      if (payload) {
        console.log(payload);
        console.log("payload===>", payload);
        state.token = payload.token;
        state.isAuthenticated = payload.isAuthenticated;
      }
    },
    removeUser(state) {
      console.log("remove State ", current(state));
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { saveToken, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
