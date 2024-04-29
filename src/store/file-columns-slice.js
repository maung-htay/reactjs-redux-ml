import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [],
  datas: [],
  file_name: "",
  loading: false,
  model_name: "",
  model_id: "",
};

const fileColumnsSlice = createSlice({
  name: "fileColumns",
  initialState,
  reducers: {
    setColumns(state, action) {
      state.columns = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    removeColumn(state) {
      state.columns = [];
    },
    setFileName(state, action) {
      state.file_name = action.payload;
    },
    setDatas(state, action) {
      state.datas = action.payload;
    },
    removeDatas(state) {
      state.datas = [];
    },
    setModelName(state, action) {
      state.model_name = action.payload;
    },
    removeModelName(state) {
      state.model_name = "";
    },
    setModelId(state, action) {
      state.model_id = action.payload;
    },
    removeModelId(state) {
      state.model_id = "";
    },
  },
});

export const fileColumnsActions = fileColumnsSlice.actions;
export default fileColumnsSlice;
