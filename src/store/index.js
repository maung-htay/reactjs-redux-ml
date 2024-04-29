import { configureStore } from "@reduxjs/toolkit";

import fileColumnsSlice from "./file-columns-slice";
import languageChangeSlice from "./language-change-slice";

const store = configureStore({
  reducer: {
    fileColumns: fileColumnsSlice.reducer,
    languageChange: languageChangeSlice.reducer,
  },
});

export default store;
