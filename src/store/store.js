import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import productsReducer from "./ProductsSlice";
import favoriteReducer from './FavoriteSlice';
import compareReducer from './CompareSlice';
import userReducer from './UserSlice';
import categoryReducer from './CategorySlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    favorite: favoriteReducer,
    compare: compareReducer,
    user: userReducer,
    category: categoryReducer
  }
})

export default store;