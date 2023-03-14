// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const URL = 'http://localhost:5000/products';

// const initialState = {
//   shopProducts: []
// }

// // export const fetchShopProducts = createAsyncThunk('shop/fetchShopProducts', async () => {
// //   const response = await axios.get(URL);
// //   return await response.data;
// // })

// const shopSlice = createSlice({
//   name: 'shop',
//   initialState,
//   reducers: {
//     setData(state, action) {
//       return action.payload;
//     },
//     pushData(state, action) {
//       return [state.shopProducts, ...action.payload]
//     }
//   },
//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(fetchShopProducts.fulfilled, (state, action) => {
//   //       state.shopProducts = action.payload;
//   //     })
//   // }
// })

// export const {setData, pushData} = shopSlice.actions;
// export default shopSlice.reducer;