import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const languageChangeSlice = createSlice({
  name: "languageChange",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const languageChangeActions = languageChangeSlice.actions;
export default languageChangeSlice;
