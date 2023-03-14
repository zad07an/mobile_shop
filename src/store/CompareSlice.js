import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let URL = 'http://localhost:5000/compare_products'

const initialState = {
  compareProducts: [],
  compareProductsQuantity: 0
}

export const addCompareProduct = createAsyncThunk('compare/addCompareProduct', async (product) => {
  const response = await axios.post(URL, product);
  return await response.data;
})

export const fetchCompareProducts = createAsyncThunk('compare/fetchCompareProducts', async () => {
  const response = await axios.get(URL);
  return await response.data;
})

export const deleteCompareProduct = createAsyncThunk('compare/deleteCompareProduct', async (id) => {
  await axios.delete(`${URL}/${id}`);
  return id;
})

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCompareProduct.fulfilled, (state, action) => {
        state.compareProducts.push(action.payload);
      })
      .addCase(fetchCompareProducts.fulfilled, (state, action) => {
        state.compareProducts = action.payload;
      })
      .addCase(deleteCompareProduct.fulfilled, (state, action) => {
        state.compareProducts = state.compareProducts.filter((item) => item.id !== action.payload)
      })
  }
})

export const {addToCompare, removeFromCompare, clearCompare} = compareSlice.actions;
export default compareSlice.reducer;