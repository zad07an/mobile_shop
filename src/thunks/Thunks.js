import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get("https://dummyjson.com/products")
  const data = res.data.products;
  return data
});