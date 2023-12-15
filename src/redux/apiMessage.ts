import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  message:""
};
export const apiMessageSlice = createSlice({
  name: "apiMessage",
  initialState,
  reducers: {
    setMessage(state,action) {
      state.isError=action.payload.isError;
      state.message=action.payload.message;
    },
  },
});

export const { setMessage } = apiMessageSlice.actions;
export default apiMessageSlice.reducer;
