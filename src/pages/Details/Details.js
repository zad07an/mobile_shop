import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { fetchSingleProduct, STATUSES } from '../../store/SingleProduct';
import { addProductCart, addToCart, deleteProductCart } from '../../store/CartSlice';
import { addCompareProduct, addToCompare, deleteCompareProduct } from '../../store/CompareSlice';
import { addFavoriteProduct, addToFavorite, deleteFavoriteProduct } from '../../store/FavoriteSlice';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbArrowsShuffle } from 'react-icons/tb';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegCheckCircle } from 'react-icons/fa';
import Rating from '../../components/Ratings/Rating';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { tabTitle } from '../../PageTabTitle/pageTabTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ProductSpec from '../../components/ProductSpec/ProductSpec';
import './Details.css';
import { Button } from '@mui/material';

export default function Details() {

  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: singleProduct, status } = useSelector((state) => state.singleProduct);
  console.log(singleProduct)

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
  }, [dispatch, productId]);

  tabTitle(`${status === STATUSES.LOADING ? 'Loading' : singleProduct.title} - MobiShop`)

  const cart = useSelector((state) => state.cart);
  const { favoriteProducts } = useSelector((state) => state.favorite);
  const compare = useSelector((state) => state.compare)

  const addedToCart = useMemo(() => {
    return cart.cartProducts.find((item) => item.id === singleProduct.id)
  }, [cart.cartProducts, singleProduct.id])

  const addedToFavorite = useMemo(() => {
    return favoriteProducts.find((item) => item.id === singleProduct.id)
  }, [favoriteProducts, singleProduct.id])

  const addedToCompare = useMemo(() => {
    return compare.compareProducts.find((item) => item.id === singleProduct.id)
  }, [compare.compareProducts, singleProduct.id])

  const addedToCartStyle = { background: addedToCart ? '#4FB807' : '#4C18AC' }

  const handleAddProductCart = async () => {
    try {
      dispatch(addProductCart(singleProduct))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteProductCart = async () => {
    try {
      dispatch(deleteProductCart(singleProduct.id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddCompareProduct = async () => {
    try {
      dispatch(addCompareProduct(singleProduct))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteCompareProduct = async () => {
    try {
      dispatch(deleteCompareProduct(singleProduct.id))
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddFavoriteProduct = async () => {
    try {
      dispatch(addFavoriteProduct(singleProduct))
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFavoriteProduct = async () => {
    try {
      dispatch(deleteFavoriteProduct(singleProduct.id))
    } catch (err) {
      console.log(err);
    }
  }

  if (status === STATUSES.LOADING) {
    return (
      <section className='details_container'>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </section>
    )
  }
  if (status === STATUSES.ERROR) {
    return (
      <section className='details_container'>
        <p>Error</p>
      </section>
    )
  }
  return (
    <section className='details_container'>
      <div className="product_details">
        <div className="product_details_slider_box">
          <div className="product_details_images_box">
            {
              singleProduct.images !== undefined && <ProductSlider product={singleProduct.images} thumbnail={singleProduct.thumbnail} />
            }
          </div>
        </div>
        <div className="product_about_box">
          <div className="product_price_box">
            <p>{singleProduct.price} <span>AMD</span></p>
          </div>
          <div className="product_name_box">
            <p>{singleProduct.title} {singleProduct.color_name}</p>
          </div>
          <div className="product_desc_box">
            <p>{singleProduct.description}</p>
          </div>
          <div className="product_per_month">
            <div>
              <p>{(singleProduct.price / 36).toFixed(2)} <span>AMD</span></p>
              <span>Ապառիկ 36 ամսով</span>
            </div>
            <div>
              <p>{(singleProduct.price / 24).toFixed(2)} <span>AMD</span></p>
              <span>Ապառիկ 24 ամսով</span>
            </div>
            <div>
              <p>{(singleProduct.price / 12).toFixed(2)} <span>AMD</span></p>
              <span>Ապառիկ 12 ամսով</span>
            </div>
          </div>
          <div className="product_rating_box">
            <div className="product_rating_title">
              <p>Վարկանիշը՝</p>
            </div>
            <div>
              <Rating product={singleProduct} />
            </div>
          </div>
          <div className="product_colors">
            <div className='product_color_title'>
              <p>Ապրանքի գույնը`</p>
            </div>
            <div className='color_box'>
              <div className='color' style={{background: `${singleProduct.color}`}}></div>
            </div>
          </div>
          <div className='payment_method'>
            <p>*ՀՀ օրենսդրության համապատասխան 300.000 դրամից ավելի գնումը վճարվում է անկանխիկ (քարտային) եղանակով</p>
          </div>
          <div className="details">
              {
                addedToFavorite ?
                <Button className='add_to_fav' onClick={handleDeleteFavoriteProduct}><FaHeart className='fav_icon' color="#E73B3B" size={24}/>
                </Button> :
                <Button className='add_to_fav' onClick={handleAddFavoriteProduct}><FaRegHeart className='fav_icon' size={24}/></Button>
              }
              {
                addedToCompare ?
                <Button className='add_to_compare' onClick={handleDeleteCompareProduct}>
                  <TbArrowsShuffle className='compare_icon' color='#E73B3B' size={24}/>
                </Button> : 
                <Button className='add_to_compare' onClick={handleAddCompareProduct}>
                  <TbArrowsShuffle className='compare_icon' size={24} />
                </Button>
              }
              {
                addedToCart ?
                <Button className='add_to_cart' style={addedToCartStyle} onClick={handleDeleteProductCart}>
                  <FaRegCheckCircle size={22}/>Ավելացված է</Button> :
                <Button className='add_to_cart' onClick={handleAddProductCart}><HiOutlineShoppingCart className='basket_icon' size={24}/>Ավելացնել</Button>
              }
          </div>
        </div>
      </div>
      <ProductSpec product={singleProduct}/>
    </section>
  )
}
