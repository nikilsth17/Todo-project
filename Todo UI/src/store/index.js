import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from "./slice/snackbarSlice";

const store= configureStore({
  reducer: {
    snackbar:snackbarReducer,

  }
})



export default store;