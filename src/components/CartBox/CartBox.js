import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdZoomOutMap } from "react-icons/md";
import { decreaseProduct, deleteProductCart, deleteProductOnDecrese, increaseProduct, increseProductQuantity, removeFromCart } from "../../store/CartSlice";
import './CartBox.css'

export default function CartBox({ product }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveProduct = async () => {
    try {
      dispatch(deleteProductCart(product.id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleIncrease = async () => {
    try {
      dispatch(increseProductQuantity(product))
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveOnDecrese = async () => {
    try {
      dispatch(deleteProductOnDecrese(product))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteProductCart = async () => {
    try {
      dispatch(deleteProductCart(product.id))
    } catch (err) {
      console.log(err);
    }
  }

  const viewProduct = (product) => {
    navigate(`/shop/${product.category}/product/${product.id}/${product.title}`)
  }

  const buyButtonStyle = product.stock === 0 ? { background: "gray", cursor: "auto" } : null;

  return (
    <div className='basket_product_box'>
      <div className='product_image'>
        <img src={product.thumbnail} alt={product.title} />
        <div onClick={() => viewProduct(product)}><MdZoomOutMap/></div>
      </div>
      <div className='product_name'>
        <p>{product.title} {product.color_name}</p>
      </div>
      <div className="product_brand">
        <p>{product.brand}</p>
      </div>
      <div className="product_price">
        <p>{product.price} <span>AMD</span></p>
      </div>
      <div className='basket_count_box'>
        {
          product.quantity === 1 ?
          <button onClick={handleDeleteProductCart} style={{background: 'red'}}>-</button>
          :
          <button onClick={handleRemoveOnDecrese}>-</button>
        }
        <div className='basket_product_quantity'>
          <p>{product.quantity}</p>
        </div>
        <button style={buyButtonStyle} onClick={handleIncrease}>+</button>
      </div>
      <div className="remove_button">
        <button onClick={handleRemoveProduct}>Հեռացնել</button>
      </div>
    </div>
  );
}