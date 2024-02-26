import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationReducer";
import userReducer from "./slices/userReducer";
import blogReducer from "./slices/blogReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    blog: blogReducer
  },
});

export default store;
