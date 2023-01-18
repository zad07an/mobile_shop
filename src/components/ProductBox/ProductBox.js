import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdCompareArrows } from "react-icons/md";
import Rating from "../../components/Ratings/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/CartSlice";
import "./ProductBox.css";
import { addToFavorite } from "../../store/FavoriteSlice";
import { addToCompare } from "../../store/CompareSlice";
import { motion } from "framer-motion";

export default function ProductBox({ product }) {
  const cart = useSelector((state) => state.cart);
  const { favoriteProducts, selectedFavorite } = useSelector((state) => state.favorite);
  const compare = useSelector((state) => state.compare)
  const dispatch = useDispatch();

  const selectedFavoriteStyle = {background: selectedFavorite ? 'gray' : null}

  const availablityStyle =
    product.stock <= 0
      ? "product_not_available"
      : product.stock <= 25
      ? "product_limited"
      : "product_available";

  const addedToCart = cart.cartProducts.find((item) => item.id === product.id)
  const addedToFavorite = favoriteProducts.find((item) => item.id === product.id)
  const addedToCompare = compare.compareProducts.find((item) => item.id === product.id)

  const buyButtonStyle = addedToCart ? { background: "#4FB807", cursor: "auto" } : null;

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
      <div className='product_image'>
        <img src={product.thumbnail} alt='' />
      </div>
      <div className='product_name'>
        <p>{product.title}</p>
        <span>{product.price}դր․</span>
      </div>
      <div className='product_per_month'>
        <span>Ամսական {(product.price / 24).toFixed(2)}դր․</span>
        <div className='product_rating'>
          <Rating product={product} />
        </div>
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
            addedToCompare ? <MdCompareArrows className='compare_icon' style={{color: '#E73B3B'}} /> : <MdCompareArrows className='compare_icon' />
          }
        </button>
        <button
          onClick={() => dispatch(addToCart(product))}
          style={buyButtonStyle}
          disabled={addedToCart}>
          {addedToCart ? <>Գնված է</> : <><HiOutlineShoppingCart className='basket_icon' />Գնել</>}
        </button>
      </div>
    </motion.div>
  );
}
