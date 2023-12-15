import { createSlice } from "@reduxjs/toolkit";

const initData = () => {
  if (typeof window != "undefined") {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "")
      : {};
  }
  return {};
};

const initialState = {
  userData: initData(),
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
