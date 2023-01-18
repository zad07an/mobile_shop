import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/Thunks";
import { STATUSES } from "./ProductsSlice";

const initialState = {
  categories: []
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
  }
})

export const { } = categorySlice.actions;
export default categorySlice.reducer
