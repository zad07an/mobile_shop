import React, { useMemo, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdZoomOutMap } from "react-icons/md";
import { TbArrowsShuffle } from 'react-icons/tb';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { addCartProduct, addProductCart, addToCart, deleteProductCart } from "../../store/CartSlice";
import { addFavoriteProduct, addToFavorite, deleteFavoriteProduct, removeFromFavortie } from "../../store/FavoriteSlice";
import { addCompareProduct, addToCompare, deleteCompareProduct } from "../../store/CompareSlice";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ProductBox.css";
import axios from "axios";
import { Button } from "@mui/material";

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
      dispatch(addProductCart(product));
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteProduct = async () => {
    try {
      dispatch(deleteProductCart(product.id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddToFavorite = async () => {
    try {
      dispatch(addFavoriteProduct(product))
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddToCompare = async () => {
    try {
      dispatch(addCompareProduct(product))
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveFavoriteProduct = async () => {
    try {
      dispatch(deleteFavoriteProduct(product.id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleRemoveCompareProduct = async () => {
    try {
      dispatch(deleteCompareProduct(product.id));
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
      <div className='product_button'>
          {
            addedToFavorite ? 
          <Button className='product_fav' style={selectedFavoriteStyle} onClick={handleRemoveFavoriteProduct} title='Հեռացնել ընտրանուց'>
              <FaHeart className='fav_icon' color="#E73B3B" />
          </Button> : 
          <Button className='product_fav' style={selectedFavoriteStyle} onClick={handleAddToFavorite} title='Ավելացնել ընտրանում'>
              <FaRegHeart className='fav_icon' />
          </Button> 
          }
          {
          addedToCompare ? 
          <Button className='product_compare' onClick={handleRemoveCompareProduct} title='Հեռացնել համեմատւթյան բաժնից'>
              <TbArrowsShuffle className='compare_icon' color="#E73B3B" />
          </Button> :
          <Button className="product_compare" onClick={handleAddToCompare} title="Ավելացնել համեմատւթյան բաժնում"><TbArrowsShuffle className='compare_icon' /></Button>
          }
          {
          addedToCart ? <Button onClick={handleDeleteProduct} title="Հեռացնել զամբյուղից"><AiOutlineCheck className='check_icon'/></Button> :
          <Button onClick={() => dispatch(handleAddToCart)} title="Ավելացնել զամբյուղում"><HiOutlineShoppingCart className='basket_icon' /></Button>
          }
      </div>
    </motion.div>
  );
}
