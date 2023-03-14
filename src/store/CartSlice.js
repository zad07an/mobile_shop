import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = "http://localhost:5000/cart_products";

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
  const res = await axios.get(URL)
  return await res.data;
})

export const addProductCart = createAsyncThunk('cart/addProductCart', async (product) => {
  const response = await axios.post(URL, {...product, quantity: 1});
  return await response.data;
})

export const increseProductQuantity = createAsyncThunk('cart/increseProductQuantity', async (product) => {
  const response = await axios.put(`${URL}/${product.id}`, {...product, quantity: product.quantity + 1});
  return await response.data
})

export const deleteProductCart = createAsyncThunk('cart/deleteProductCart', async (id) => {
  await axios.delete(`${URL}/${id}`);
  return id;
})

export const deleteProductOnDecrese = createAsyncThunk('cart/deleteProductOnDecrese', async (product) => {
  if (product.quantity > 1) {
    const response = await axios.put(`${URL}/${product.id}`, {...product, quantity: product.quantity - 1})
    return await response.data
  }
})

export const clearProducts = createAsyncThunk('cart/clearProducts', async () => {
  const response = await axios.delete(URL);
  return response.data;
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartProducts(state, action) {
      state.data = action.payload
    },
    addToCart(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (productIndex >= 0) {
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id)
      } else {
        const tempProduct = { ...action.payload, productQuantity: 1}
        state.cartProducts.push(tempProduct);
      }
    },
 
    removeFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
    },
    decreaseProduct(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (state.cartProducts[productIndex].productQuantity > 1) {
        state.cartProducts[productIndex].productQuantity -= 1
      } else {
        state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload.id);
      }
    },
    clearCart(state) {
      state.cartProducts = []
    },
    getTotalAmount(state, action) {
      let {total, quantity} = state.cartProducts.reduce((amount, product) => {
        const { price, quantity } = product;
        const productTotal = Number(price) * Number(quantity);
        amount.total += productTotal;
        amount.quantity += quantity;
        return amount;
      }, { total: 0, quantity: 0 });
      state.cartTotalAmount = total;
      state.quantity = quantity;
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
    .addCase(addProductCart.fulfilled, (state, action) => {
      state.cartProducts.push(action.payload)
    })
    .addCase(deleteProductCart.fulfilled, (state, action) => {
      state.cartProducts = state.cartProducts.filter((product) => product.id !== action.payload);
    })
    .addCase(increseProductQuantity.fulfilled, (state, action) => {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      state.cartProducts[productIndex].quantity += 1
    })
    .addCase(deleteProductOnDecrese.fulfilled, (state, action) => {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (state.cartProducts[productIndex].quantity > 1) {
        state.cartProducts[productIndex].quantity -= 1
      }
    })
    .addCase(clearProducts.fulfilled, (state, action) => {
      state.cartProducts = [];
    })
  }
})

export const { addToCart, removeFromCart, clearCart, getTotalAmount, increaseProduct, decreaseProduct, setCartProducts } = cartSlice.actions;
export default cartSlice.reducer;