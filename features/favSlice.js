import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  favItems: [],
  // cartTotalQuantity: 0,
  // createTotalAmount: 0,
};

export const favSlice = createSlice({
  name: "fav",
  initialState: initialStateValue,
  reducers: {
    addToFav: (state, action) => {
      state.favItems.push(action.payload);
    },
  },
});

export const { addToFav } = favSlice.actions;
export default favSlice.reducer;
