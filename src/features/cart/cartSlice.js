import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId != action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId == action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;

      //remove if its quantity is 0
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      //  other way:
      // state.cart = state.cart.filter(
      // (item) => item.pizzaId != action.payload,
      // );
    },
  },
});

export default cartSlice.reducer;
