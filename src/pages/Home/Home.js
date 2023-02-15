import React, { useCallback, useEffect, useRef, useState } from 'react'
import SliderComp from '../../components/Slider/Slider'
import ProductBox from '../../components/ProductBox/ProductBox'
import { fetchProducts } from '../../store/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { STATUSES } from '../../store/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import { BsTabletLandscape, BsSmartwatch, BsHeadphones } from 'react-icons/bs';
import { AiOutlineMobile, AiOutlineCamera } from 'react-icons/ai';
import { MdOutlineMonitor, MdComputer } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';
import './Home.css'
import { useMemo } from 'react';
import { tabTitle } from '../../PageTabTitle/pageTabTitle';
import { Box, CircularProgress } from '@mui/material'

export default function Home() {

  tabTitle('Գլխավոր - MobiShop')
  const [currentPage, setCurrentPage] = useState(0);
  const productsSectionRef = useRef();

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  const goToCategory = (nav) => {
    navigate(`/shop/${nav}`)
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const postPerPage = 10;
  const pageCount = Math.ceil(products.length / postPerPage)
  const pageVisited = currentPage * postPerPage;
  const currentPosts = products.slice(pageVisited, pageVisited + postPerPage);

  const onPageChange = useCallback(({selected}) => {
    setCurrentPage(selected)
    navigate('/shop/all')
  }, [navigate])

  const memoizedProducts = useMemo(() => {
    return currentPosts.map((product, index) => {
      return <ProductBox key={product.id} product={product} index={index} />
    })
  }, [currentPosts])

  return (
    <section className='home_container'>
      <SliderComp />
      <div className='products_banner'>
        <div className='each_product' onClick={() => goToCategory('smartphones')}>
          <AiOutlineMobile className='banner_icon'/>
          <p>Հեռախոսներ</p>
        </div>
        <div className='each_product' onClick={() => goToCategory('laptops')}>
          <MdComputer className='banner_icon'/>
          <p>Նոթբուքեր</p>
        </div>
        <div className='each_product'>
          <BsSmartwatch className='banner_icon'/>
          <p>Ժամացույցներ</p>
        </div>
        <div className='each_product'>
          <MdOutlineMonitor className='banner_icon'/>
          <p>Հեռուստացույցներ</p>
        </div>
        <div className='each_product'>
          <HiOutlineDesktopComputer className='banner_icon'/>
          <p>Համակարգիչներ</p>
        </div>
        <div className='each_product'>
          <BsTabletLandscape className='banner_icon'/>
          <p>Պլանշետներ</p>
        </div>
        <div className='each_product'>
          <BsHeadphones className='banner_icon'/>
          <p>Աքսեսուարներ</p>
        </div>
        <div className='each_product'>
          <AiOutlineCamera className='banner_icon'/>
          <p>Տեսախցիկներ</p>
        </div>
      </div>
      <div className="dislpay_products">
        <div className="display_product_title">
          <h2>Հեռախոսներ</h2>
        </div>
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
          <>
            <div className="products_list">
              {memoizedProducts}
            </div>
            <div className="display_pagination">
              <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                pageCount={pageCount}
                onPageChange={onPageChange}
                containerClassName='pagination_buttons'
                previousClassName='prev_button'
                nextClassName='next_button'
                activeClassName='active_page_button'
                pageClassName='page_buttons'
              />
            </div>
          </>
        }
      </div>
    </section>
  )
}
