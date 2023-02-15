import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get("http://localhost:5000/products")
  return await res.data;
});

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
    },
    incrementRating(state, action) {
      state.data.map((product) => {
        if (product.id === action.payload.product.id) {
          return [
            {
              ...product,
              rating: product.rating = action.payload.index + 1
            }]
        } else {
          return product.rating
        }
      })
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

export const { setProducts, setStatus, incrementRating} = productsSlice.actions;
export default productsSlice.reducer;