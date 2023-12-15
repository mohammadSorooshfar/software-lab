import { configureStore } from "@reduxjs/toolkit";
import apiMessageReducer from "./apiMessage";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    apiMessage: apiMessageReducer,
    user: userReducer,
  },
});

export default store;
// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
