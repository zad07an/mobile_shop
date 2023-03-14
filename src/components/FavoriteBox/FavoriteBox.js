import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFavoriteProduct, removeFromFavortie } from '../../store/FavoriteSlice';
import { MdZoomOutMap } from "react-icons/md";
import { FaRegCheckCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineCheck } from 'react-icons/ai';
import './FavoriteBox.css'
import { addProductCart, addToCart } from '../../store/CartSlice';
import { useNavigate } from 'react-router-dom';

export default function FavoriteBox({product}) {

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const viewProduct = (product) => {
    navigate(`/shop/${product.category}/product/${product.id}/${product.title}`)
  }

  const handleAddToCartFromFavorite = async () => {
    try {
      dispatch(addProductCart(product))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFavoriteProduct = async () => {
    try {
      dispatch(deleteFavoriteProduct(product.id))
    } catch (err) {
      console.log(err);
    }
  }

  const addedToCart = cartProducts.cartProducts.find((item) => item.id === product.id);
  const addedToCartStyle = addedToCart ? {color: '#4FB807'} : null

  return (
    <div className='favorite_product_box'>
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
      <div className="favorite_box_buttons">
        <button className='remove_button' onClick={handleDeleteFavoriteProduct}><BsTrash/></button>
        <button className='add_button' onClick={handleAddToCartFromFavorite} style={addedToCartStyle}>{addedToCart ? <AiOutlineCheck/> : <HiOutlineShoppingCart/>}</button>
      </div>
    </div>
  )
}
