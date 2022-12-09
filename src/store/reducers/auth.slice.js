import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  isAuth: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuth = true;
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLogout, setError } = authSlice.actions;

export default authSlice.reducer;
