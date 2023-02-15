import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdZoomOutMap } from "react-icons/md";
import { decreaseProduct, increaseProduct, removeFromCart } from "../../store/CartSlice";
import './CartBox.css'

export default function CartBox({ product }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewProduct = (product) => {
    navigate(`/shop/${product.category}/product/${product.id}/${product.title}`)
  }

  const buyButtonStyle = product.stock === 0 ? { background: "gray", cursor: "auto" } : null;

  return (
    <div className='basket_product_box'>
      <div className='product_image'>
        <img src={product.thumbnail} alt="" />
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
        <button onClick={() => dispatch(decreaseProduct(product))}>-</button>
        <div className='basket_product_quantity'>
          <p>{product.productQuantity}</p>
        </div>
        <button style={buyButtonStyle} onClick={() => dispatch(increaseProduct(product))} disabled={product.stock === 0}>+</button>
      </div>
      <div className="remove_button">
        <button onClick={() => dispatch(removeFromCart(product))}>Հեռացնել</button>
      </div>
    </div>
  );
}