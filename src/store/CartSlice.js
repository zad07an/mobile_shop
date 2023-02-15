import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const STATUSES = {
  IDLE: 'Idle',
  LOADING: 'Loading',
  ERROR: 'Error'
}

const initialState = {
  cartProducts: [],
  productQuantity: 0,
  cartTotalAmount: 0,
  status: STATUSES.IDLE
}

export const fetchCartProducts = createAsyncThunk('cart/fetchCartProducts', async () => {
  const res = await axios.get("http://localhost:5000/cart_products")
  return await res.data;
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts(state, action) {
      state.data = action.payload
    },
    async addToCart(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (productIndex >= 0) {
        await axios.delete(`http://localhost:5000/cart_products/${action.payload.id}`)
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id)
      } else {
        await axios.post('http://localhost:5000/cart_products', { ...action.payload, productQuantity: 1})
        const tempProduct = { ...action.payload, productQuantity: 1}
        state.cartProducts.unshift(tempProduct);
      }
    },
    increaseProduct(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      state.cartProducts[productIndex].productQuantity += 1
    },
    removeFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
    },
    decreaseProduct(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (state.cartProducts[productIndex].productQuantity > 1) {
        state.cartProducts[productIndex].productQuantity -= 1
      } else if (state.cartProducts[productIndex].productQuantity === 1) {
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
      }
    },
    clearCart(state) {
      state.cartProducts = []
    },
    getTotalAmount(state, action) {
      let {total, quantity} = state.cartProducts.reduce((amount, product) => {
        const { price, productQuantity } = product;
        const productTotal = Number(price) * Number(productQuantity);
        amount.total += productTotal;
        amount.quantity += productQuantity;
        return amount;
      }, { total: 0, quantity: 0 });
      state.cartTotalAmount = total;
      state.productQuantity = quantity;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCartProducts.pending, (state, action) => {
      state.status = STATUSES.LOADING
    })
    .addCase(fetchCartProducts.fulfilled, (state, action) => {
      state.cartProducts = action.payload
      state.status = STATUSES.IDLE;
    })
    .addCase(fetchCartProducts.rejected, (state, action) => {
      state.status = STATUSES.ERROR
    })
  }
})

export const { addToCart, removeFromCart, clearCart, getTotalAmount, increaseProduct, decreaseProduct,setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;