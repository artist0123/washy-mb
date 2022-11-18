import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  user_id: null,
};

export const userSlice = createSlice({
  name: "user_data",
  initialState,
  reducers: {
    userdata: (state, action) => {
      state.user = action.payload;
    },
  },
  name: "user_iddata",
  initialState,
  reducers: {
    user_id: (state, action) => {
      state.user_id = action.payload;
    }
  }
});

export const { userdata, user_iddata } = userSlice.actions;
export default userSlice.reducer;
