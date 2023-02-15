// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// // export const createProductsAxios = axios.create({
// //   baseURL: 'https://dummyjson.com/products'
// // })

// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//   const res = await axios.get(`https://dummyjson.com/products`)
//   const data = res.data.products;
//   return data;
// });

// export const fetchSingleProduct = createAsyncThunk('singleProduct/fetch', async (id) => {
//     const res = await axios.get(`https://dummyjson.com/products/${id}`)
//     const data = await res.data;
//     return data;
// });
