import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    userState: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
