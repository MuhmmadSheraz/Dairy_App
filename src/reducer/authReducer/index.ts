import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../services/mirage/routes/user";

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
    saveToken: (state, { payload }: { payload: AuthState }) => {
      if (payload) {
        state.token = payload.token;
        state.isAuthenticated = payload.isAuthenticated;
      }
    },
    removeUser(state) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const { saveToken, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;
