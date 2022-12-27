import React, {createContext, useState} from "react";
import { productData } from "../Data/Products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < productData.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {

  const [cartProducts, setCartProducts] = useState(getDefaultCart());

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (const item in cartProducts) {
      if (cartProducts[item] > 0) {
        let itemInfo = productData.find((product) => product.id === Number(item));
        totalPrice += cartProducts[item] * itemInfo.price
      }
    }
    return totalPrice;
  }

  const getProductSubtotal = (productId) => {
    let totalPrice = 0;
    for (const item in cartProducts) {
      console.log(cartProducts[item]);
      if (cartProducts[item] === productId) {
        let itemInfo = productData.find((product) => product.id === productId);
        totalPrice += cartProducts[item] * itemInfo.price; 
      }
    }
    return totalPrice;
  }

  const addToCart = (productId) => {
    setCartProducts((prev) => ({...prev, [productId]: prev[productId] + 1}));
  };

  const removeFromCart = (productId) => {
    setCartProducts((prev) => ({...prev, [productId]: prev[productId] - 1}));
  };

  const removeProductFromCart = (productId) => {
    setCartProducts((prev) => ({...prev, [productId]: prev[productId] = 0}));
  };

  const clearAllCartProducts = () => setCartProducts(getDefaultCart());

  const contextValue = {cartProducts, addToCart, removeFromCart, clearAllCartProducts, getTotalPrice, removeProductFromCart, getProductSubtotal}

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}