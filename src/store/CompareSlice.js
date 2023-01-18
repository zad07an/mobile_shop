import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareProducts: [],
  compareProductsQuantity: 0
}

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare(state, action) {
      const productExist = state.compareProducts.find((product) => product.id === action.payload.id);
      if (productExist) {
        state.compareProducts = state.compareProducts.filter((product) => product.id !== action.payload.id);
      } else {
        const tempProduct = { ...action.payload, compareProductsQuantity: 1 }
        state.compareProducts.unshift(tempProduct);
      }
    },
    removeFromCompare(state, action) {
      state.compareProducts = state.compareProducts.filter((product) => product.id !== action.payload.id);
    },
    clearCompare(state, action) {
      state.compareProducts = [];
    }
  }
})

export const {addToCompare, removeFromCompare, clearCompare} = compareSlice.actions;
export default compareSlice.reducer;