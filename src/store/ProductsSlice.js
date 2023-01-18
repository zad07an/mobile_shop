import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/Thunks";

export const STATUSES = Object.freeze({
  IDLE: 'Idle',
  ERROR: 'Error',
  LOADING: 'Loading'
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: STATUSES.IDLE
  },
  reducers: {
    setProducts(state, action) {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    }
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

export const { setProducts, setStatus} = productsSlice.actions;
export default productsSlice.reducer;