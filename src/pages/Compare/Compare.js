import React from "react";
import CompareBox from "../../components/CompareBox/CompareBox";
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCompare, fetchCompareProducts } from '../../store/CompareSlice';
import { tabTitle } from "../../PageTabTitle/pageTabTitle";
import './Compare.css'
import { useEffect } from "react";

const Compare = ({compareProducts}) => {

  tabTitle('Համեմատություն - MobiShop')
  const products = compareProducts;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className='compare_container'>
      <div className='compare_box'>
        <div className='compare_subtitle'>
          <h2>Համեմատություն</h2>
        </div>
        {products.length === 0 ? (
          <div className='compare_empty_box'>
            <div className='compare_empty'>
              <div className='left_border'></div>
              <p>Դուք չունեք համեմատություններ:</p>
            </div>
            <button onClick={() => navigate("/")}>Վերադառնալ Խանութ</button>
          </div>
        ) : (
          <div className='display_compare_products'>
            {/* <div className='compare_products'>
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
            </div> */}
            <div className="display_compare">
              {products.map((product) => {
                return <CompareBox key={product.id} product={product} />;
              })}
            </div>
            <div className='compare_clear_add_to_cart'>
              <div className='compare_return_shop_clear'>
                <div className='compare_return_shop'>
                  <Link to='/'>
                    <HiOutlineArrowSmLeft size={22} />
                    Շարունակել գնումները
                  </Link>
                </div>
                <button
                  onClick={() => dispatch(clearCompare(products))}>
                  Հեռացնել Ամբողջը
                </button>
                {/* <button className='add_to_cart' onClick={() => dispatch(addToCartFromcompare(products.compareProducts))}>Ավելացնել զամբյուղում</button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Compare;
