import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { decreaseProduct, increaseProduct, removeFromCart } from "../../store/CartSlice";
import './CartBox.css'

export default function CartBox({ product }) {

  const dispatch = useDispatch();

  const buyButtonStyle =
    product.stock === 0 ? { background: "gray", cursor: "auto" } : null;

  return (
    <div className='basket_product_box'>
      <div className='basket_remove_box'>
        <button onClick={() => dispatch(removeFromCart(product))}>
          <RiCloseFill />
        </button>
      </div>
      <div className='basket_image_box'>
        <div className='basket_product_image'>
          <img src={product.thumbnail} alt='' />
        </div>
      </div>
      <div className='basket_name_box'>{product.title}</div>
      <div className='basket_price_box'>{product.price}դր․</div>
      <div className='basket_count_box'>
        <button onClick={() => dispatch(decreaseProduct(product))}>-</button>
        <div className='basket_product_quantity'>
          <p>{product.productQuantity}</p>
        </div>
        <button style={buyButtonStyle} onClick={() => dispatch(increaseProduct(product))} disabled={product.stock === 0}>+</button>
      </div>
    </div>
  );
}
