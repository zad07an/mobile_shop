import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavortie } from '../../store/FavoriteSlice';
import { RiCloseFill } from "react-icons/ri";
import {FaRegCheckCircle} from 'react-icons/fa'
import './FavoriteBox.css'
import { addToCart } from '../../store/CartSlice';

export default function FavoriteBox({product}) {

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);

  const addedToCart = cartProducts.cartProducts.find((item) => item.id === product.id);
  const addedToCartStyle = addedToCart ? {background: '#4FB807', cursor: 'auto'} : null

  return (
    <div className='favorite_product_box'>
      <div className='favorite_remove_box'>
        <button onClick={() => dispatch(removeFromFavortie(product))}>
          <RiCloseFill />
        </button>
      </div>
      <div className='favorite_image_box'>
        <div className='favorite_product_image'>
          <img src={product.thumbnail} alt='' />
        </div>
      </div>
      <div className='favorite_name_box'>{product.title}</div>
      <div className='favorite_price_box'>{product.price}դր․</div>
      <div className="favorite_box_add_button">
        <button disabled={addedToCart} style={addedToCartStyle} onClick={() => dispatch(addToCart(product))}>
          {addedToCart ? <>Ավելացված է <FaRegCheckCircle size={20}/></> : <>Ավելացնել զամբյուղում</>}
        </button>
      </div>
    </div>
  )
}
