import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
});

// export action creator
export const { updateName } = userSlice.actions;

// export reducer - to setup(configure) the store
export default userSlice.reducer;
