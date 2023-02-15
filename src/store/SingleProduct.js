import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: 'Idle',
  ERROR: 'Error',
  LOADING: 'Loading'
})

const initialState = {
  data: {},
  status: STATUSES.IDLE
}

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    return response.data;
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.data = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR
      })
  }
})

export const {setProducts, setStatus} = singleProductSlice.actions;
export default singleProductSlice.reducer;