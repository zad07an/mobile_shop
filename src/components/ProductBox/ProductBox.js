import React, { useMemo, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdZoomOutMap } from "react-icons/md";
import { TbArrowsShuffle } from 'react-icons/tb';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct, addToCart } from "../../store/CartSlice";
import { addToFavorite } from "../../store/FavoriteSlice";
import { addToCompare } from "../../store/CompareSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProductBox.css";
import axios from "axios";

export default function ProductBox({ product, index }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [onHover, setOnHover] = useState(false);
  const onImageEnter = () => {
    setOnHover(true)
  }

  const onImageLeave = () => {
    setOnHover(false)
  }

  const cart = useSelector((state) => state.cart);
  const { favoriteProducts, selectedFavorite } = useSelector((state) => state.favorite);
  const compare = useSelector((state) => state.compare)

  const selectedFavoriteStyle = {background: selectedFavorite ? 'gray' : null}

  const viewProduct = (product) => {
    navigate(`/shop/${product.category}/product/${product.id}/${product.title}`)
  }

  const availablityStyle =
    product.stock <= 0
      ? "product_not_available"
      : product.stock <= 25
      ? "product_limited"
      : "product_available";

  const addedToCart = useMemo(() => {
    return cart.cartProducts.find((item) => item.id === product.id)
  }, [cart.cartProducts, product.id])

  const addedToFavorite = useMemo(() => {
    return favoriteProducts.find((item) => item.id === product.id)
  }, [favoriteProducts, product.id])

  const addedToCompare = useMemo(() => {
    return compare.compareProducts.find((item) => item.id === product.id)
  }, [compare.compareProducts, product.id])

  // const buyButtonStyle = addedToCart ? { background: "#4FB807" } : null;

  const handleAddToCart = async () => {
    try {
      dispatch(addToCart(product));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <motion.div key={product.id} className='product_box'
      initial = {{opacity: 0}}
      animate={{ opacity: 1 }}
      exit = {{opacity: 0}}
    >
      <div className={`product_availablity ${availablityStyle}`}>
        <p>
          {product.stock <= 0
            ? `Առկա չէ`
            : product.stock <= 25
            ? `Սահմանապակ է`
            : `Առկա է`}
        </p>
      </div>
      <div className='product_image' onMouseEnter={onImageEnter} onMouseLeave={onImageLeave}>
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
      <div className='product_button'>
        <button className='product_fav' style={selectedFavoriteStyle} onClick={() => dispatch(addToFavorite(product))} title='Ավելացնել ընտրանում'>
          {
            addedToFavorite ? <><FaHeart className='fav_icon' color="#E73B3B" /></> :
            <><FaRegHeart className='fav_icon' /></>
          }
        </button>
        <button className='product_compare' title='Համեմատել' onClick={() => dispatch(addToCompare(product))}>
          {
            addedToCompare ? <TbArrowsShuffle className='compare_icon' style={{color: '#E73B3B'}} /> : <TbArrowsShuffle className='compare_icon' />
          }
        </button>
        <button
          onClick={() => dispatch(handleAddToCart)}>
          {addedToCart ? <AiOutlineCheck className='check_icon'/> : <HiOutlineShoppingCart className='basket_icon' />}
        </button>
      </div>
    </motion.div>
  );
}
