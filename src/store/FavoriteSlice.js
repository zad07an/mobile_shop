import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteProducts: [],
  favortieProductsQuantity: 0,
  selectedFavorite: false,
};

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
  }
})

export const {addToFavorite, removeFromFavortie, getFavoriteProductsQuantity, clearFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;