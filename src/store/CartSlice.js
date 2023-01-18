import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  productQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const productIndex = state.cartProducts.findIndex((product) => product.id === action.payload.id);
      if (productIndex >= 0) {
        state.cartProducts[productIndex].productQuantity += 1;
      } else {
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
  }
})

export const { addToCart, removeFromCart, clearCart, getTotalAmount, increaseProduct, decreaseProduct } = cartSlice.actions;
export default cartSlice.reducer;