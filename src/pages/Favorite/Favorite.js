import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearFavorite, getFavoriteProductsQuantity } from '../../store/FavoriteSlice';
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import FavoriteBox from '../../components/FavoriteBox/FavoriteBox';
import './Favorite.css'

export default function Favorite() {
  const products = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFavoriteProductsQuantity())
  }, [products, dispatch]);

  return (
    <section className='favorite_container'>
      <div className='favorite_box'>
        <div className='favorite_subtitle'>
          <h2>Ֆավորիտներ</h2>
        </div>
        {products.favoriteProducts.length === 0 ? (
          <div className='favorite_empty_box'>
            <div className='favorite_empty'>
              <div className='left_border'></div>
              <p>Ձեր Ֆավորիտները դատարկ է:</p>
            </div>
            <button onClick={() => navigate("/")}>Վերադառնալ Խանութ</button>
          </div>
        ) : (
          <div className='display_favorite_products'>
              <div className='favorite_products'>
              <div></div>
              <div></div>
              <div>
                <p>Ապրանք</p>
              </div>
              <div>
              <p>Գին</p>
              </div>
              <div>
                <p>Ավելացնել</p>
              </div>
            </div>
              {products.favoriteProducts.map((product) => {
                return <FavoriteBox key={product.id} product={product} />;
              })}
            <div className='favorite_clear_add_to_cart'>
              <div className="favorite_return_shop_clear">
                <div className="favorite_return_shop">
                  <Link to='/'><HiOutlineArrowSmLeft size={22}/>Շարունակել գնումները</Link>
                </div>
                <button onClick={() => dispatch(clearFavorite(products.favoriteProducts))}>Հեռացնել Ամբողջը</button>
                {/* <button className='add_to_cart' onClick={() => dispatch(addToCartFromFavorite(products.favoriteProducts))}>Ավելացնել զամբյուղում</button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
