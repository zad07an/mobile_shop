import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  favoriteProducts: [],
  favortieProductsQuantity: 0,
  selectedFavorite: false,
};

export const addFavoriteProduct = createAsyncThunk('favorite/addFavoriteProduct', async (product) => {
  const response = await axios.post('http://localhost:5000/favorite_products', product)
  return response.data;
})

export const fetchFavoriteProducts = createAsyncThunk('favorite/fetchFavoriteProducts', async () => {
  const response = await axios.get('http://localhost:5000/favorite_products');
  return response.data;
})

export const deleteFavoriteProduct = createAsyncThunk('favorite/deleteFavoriteProduct', async (id) => {
  await axios.delete(`http://localhost:5000/favorite_products/${id}`);
  return id;
})

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite(state, action) {
      const productExist = state.favoriteProducts.find((product) => product.id === action.payload.id);
      if (productExist) {
        state.favoriteProducts = state.favoriteProducts.filter((product) => product.id !== action.payload.id);
      } else {
        const tempProduct = { ...action.payload, favortieProductsQuantity: 1 }
        state.favoriteProducts.unshift(tempProduct);
      }
    },
    removeFromFavortie(state, action) {
      state.favoriteProducts = state.favoriteProducts.filter((product) => product.id !== action.payload.id);
    },
    getFavoriteProductsQuantity(state, action) {
      let {quantity} = state.favoriteProducts.reduce((quantity, product) => {
        const { favortieProductsQuantity } = product;
        quantity.quantity += Number(favortieProductsQuantity);
        return quantity;
      }, { quantity: 0 });
      state.favortieProductsQuantity = quantity;
    },
    clearFavorite(state) {
      state.favoriteProducts = []
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
      state.favoriteProducts = action.payload;
    })
    .addCase(addFavoriteProduct.fulfilled, (state, action) => {
      state.favoriteProducts.push(action.payload);
    })
    .addCase(deleteFavoriteProduct.fulfilled, (state, action) => {
      state.favoriteProducts = state.favoriteProducts.filter((product) => product.id !== action.payload)
    })
  }
})

export const {addToFavorite, removeFromFavortie, getFavoriteProductsQuantity, clearFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;