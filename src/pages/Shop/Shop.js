import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ProductBox from '../../components/ProductBox/ProductBox';
import { STATUSES } from '../../store/ProductsSlice';
import { fetchProducts } from '../../store/ProductsSlice';
import Slider from '@mui/material/Slider';
import { Box, CircularProgress } from '@mui/material';
import { tabTitle } from '../../PageTabTitle/pageTabTitle';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Shop.css'
import Select from '../../components/Select/Select';
import SelectComponent from '../../components/Select/Select';

export default function Shop() {

  tabTitle('Խանութ - MobiShop')
  const { id } = useParams();
  const shopProductsRef = useRef();
  const [value, setValue] = useState([0, 1000000]);
  const [company, setCompany] = useState('all');
  const [brand, setBrand] = useState('all');
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  console.log(company)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const brands = useMemo(() => {
    return products.reduce((aggr, val) => aggr.concat(val.brand.toLowerCase()), [])
  }, [products])

  const categories = useMemo(() => {
    return products.reduce((aggr, val) => aggr.concat(val.category.toLowerCase()), [])
  }, [products])

  const productOptions = [...new Set(brands)];
  const productCategories = [...new Set(categories)];

  const isActiveProduct = ({ isActive }) => isActive && 'active_category';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className='shop_container'>
      <div ref={shopProductsRef} className="display_shop_products">

      {/* Display category bar */}

        <div className="display_categories_bar">
          <div className="select_price">
            <div className="price_title">
              <p>Price</p>
            </div>
            <div className='introduction_range_slider'>
              <p>Use slider to filter products by price</p>
            </div>
            <div className="display_price_range">
              <p>Min</p>
              <div><input type="text" value={`${value[0]}դր․`} readOnly/></div>
              <p>Max</p>
              <div><input type="text" value={`${value[1]}դր․`} readOnly/></div>
            </div>
            <Box sx={{ width: '100%' }}>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                min={0}
                step={5}
                max={1000000}
              />
            </Box>
          </div>
          <div className='select_categories'>
            <div className="category_title">
              <p>Category</p>
            </div>
            <NavLink to='/shop/all' className={isActiveProduct}>Բոլոր</NavLink>
            {
              productCategories.map((product) => {
                return <NavLink to={`/shop/${product}`} className={isActiveProduct}>{product.charAt(0).toUpperCase()}{product.slice(1)}</NavLink>
              })
            }
          </div>
          <div className="select_company">
            <div className="company_title">
              <p>Company</p>
            </div>
            <div className='introduction_company'>
              <p>Select company</p>
            </div>
            <SelectComponent productOptions={productOptions} company={company} setCompany={setCompany}/>
          </div>
        </div>

        {/* ! Display products */}

        <div className='display_products'>
          {
            status === STATUSES.LOADING ?
              <div className='loading_status'>
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              </div> :
            status === STATUSES.ERROR ?
            <div className='error_status'>
              <h2>Ինչ–որ բան այն չէ!</h2>
            </div> :
            <div className="products_list">
              {
                products.filter((product) => id !== 'all' && brand !== 'all' ?
                  product.category === id && product.price <= value[1] && product.price >= value[0] && product.brand.toLowerCase() === brand :
                  id !== 'all' && brand === 'all' ?
                  product.category === id && product.price <= value[1] && product.price >= value[0] :
                  id === 'all' && brand !== 'all' ?
                  product.price <= value[1] && product.price >= value[0] && product.brand.toLowerCase() === brand :
                  product.price <= value[1] && product.price >= value[0]).map((product, index) => {
                  return <ProductBox key={product.id} product={product} index={index} />
                })
              }
            </div>
          }
        </div>
      </div>
    </section>
  )
}
