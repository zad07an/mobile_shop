import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import ProductBox from '../../components/ProductBox/ProductBox';
import { STATUSES } from '../../store/ProductsSlice';
import { fetchProducts } from '../../thunks/Thunks';
import Slider from '@mui/material/Slider';
import { Box } from '@mui/material';
import './Shop.css'

export default function Shop() {

  const { id } = useParams();
  const [value, setValue] = useState([0, 1600]);
  const [brand, setBrand] = useState('all');
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const brands = products.reduce((aggr, val) => aggr.concat(val.brand.toLowerCase()), [])
  const productOptions = [...new Set(brands)];

  const isActiveProduct = ({ isActive }) => isActive && 'active_category';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className='shop_container'>
      <div className="display_shop_products">
        <div className="display_categories_bar">
          <div className="select_price">
            <div className="price_title">
              <p>Price</p>
            </div>
            <div className='introduction_range_slider'>
              <p>Use slider or enter min and max price</p>
            </div>
            <div className="display_price_range">
              <p>Min</p>
              <div><p>{value[0]}դր․</p></div>
              <p>Max</p>
              <div><p>{value[1]}դր․</p></div>
            </div>
            <Box sx={{ width: '100%' }}>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby='range-slider'
                min={0}
                step={5}
                max={1600}
              />
            </Box>
          </div>
          <div className='select_categories'>
            <div className="category_title">
              <p>Category</p>
            </div>
            <NavLink to='/shop/all' className={isActiveProduct}>Բոլոր</NavLink>
            <NavLink to='/shop/smartphones' className={isActiveProduct}>Հեռախոսներ</NavLink>
            <NavLink to='/shop/laptops' className={isActiveProduct}>Նոթբուքեր</NavLink>
          </div>
          <div className="select_company">
            <div className="company_title">
              <p>Company</p>
            </div>
            <div className='introduction_company'>
              <p>Select company</p>
            </div>
            <select className='select_input' defaultValue={brand} onChange={(e) => setBrand(e.target.value)}>
              <optgroup>
                <option value="all" selected>All</option>
                {
                  productOptions.map((product, index) => {
                    return <option key={index} value={product.toLowerCase()}>{product.charAt(0).toUpperCase()}{product.slice(1)}</option>
                  })
                }
              </optgroup>
            </select>
          </div>
        </div>
        <div className='display_products'>
          {
            status === STATUSES.LOADING ?
              <div className='loading_status'>
                <h2>Բեռնում...</h2>
              </div> :
            status === STATUSES.ERROR ?
              <div className='error_status'>
                <h2>Ինչ–որ բան այն չէ!</h2>
              </div> :
            <div className="products_list">
              {
                id !== 'all' && brand !== 'all' ?
                products.filter((product) => product.category === id && product.price <= value[1] && product.price >= value[0] && product.brand.toLowerCase() === brand).map((product) => {
                  return <ProductBox key={product.id} product={product} />
                }) :
                id !== 'all' && brand === 'all' ?
                products.filter((product) => product.category === id && product.price <= value[1] && product.price >= value[0]).map((product) => {
                  return <ProductBox key={product.id} product={product} />
                }) :
                id === 'all' && brand !== 'all' ?
                products.filter((product) => product.price <= value[1] && product.price >= value[0] && product.brand.toLowerCase() === brand).map((product) => {
                  return <ProductBox key={product.id} product={product} />
                }) :
                id === 'all' && brand === 'all' ?
                products.filter((product) => product.price <= value[1] && product.price >= value[0]).map((product) => {
                  return <ProductBox key={product.id} product={product} />
                }) :
                null
              }
            </div>
          }
        </div>
      </div>
    </section>
  )
}
