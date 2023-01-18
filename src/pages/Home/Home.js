import React, { useEffect } from 'react'
import SliderComp from '../../components/Slider/Slider'
import ProductBox from '../../components/ProductBox/ProductBox'
import { fetchProducts } from "../../thunks/Thunks";
import { useDispatch, useSelector } from 'react-redux'
import { STATUSES } from '../../store/ProductsSlice';
import { useNavigate } from 'react-router-dom';
import { BsTabletLandscape, BsSmartwatch, BsHeadphones } from 'react-icons/bs';
import { AiOutlineMobile, AiOutlineCamera } from 'react-icons/ai';
import { MdOutlineMonitor, MdComputer } from 'react-icons/md';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import './Home.css'

export default function Home() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);


  const goToCategory = (nav) => {
    navigate(`/shop/${nav}`)
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className='home_container'>
      <SliderComp />
      <div className='products_banner'>
        <div className='each_product' onClick={() => goToCategory('smartphones')}>
          <AiOutlineMobile size="24"/>
          <p>Հեռախոսներ</p>
        </div>
        <div className='each_product' onClick={() => goToCategory('laptops')}>
          <BsTabletLandscape size="24"/>
          <p>Պլանշետներ</p>
        </div>
        <div className='each_product'>
          <BsSmartwatch size="24"/>
          <p>Ժամացույցներ</p>
        </div>
        <div className='each_product'>
          <MdOutlineMonitor size="24"/>
          <p>Հեռուստացույցներ</p>
        </div>
        <div className='each_product'>
          <HiOutlineDesktopComputer size="24"/>
          <p>Համակարգիչներ</p>
        </div>
        <div className='each_product'>
          <MdComputer size="24"/>
          <p>Նոթբուքեր</p>
        </div>
        <div className='each_product'>
          <BsHeadphones size="24"/>
          <p>Աքսեսուարներ</p>
        </div>
        <div className='each_product'>
          <AiOutlineCamera size="24"/>
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
              <h2>Բեռնում...</h2>
            </div> :
          status === STATUSES.ERROR ?
            <div className='error_status'>
              <h2>Ինչ–որ բան այն չէ!</h2>
            </div> :
          <div className="products_list">
            {
              products.map((product) => {
                return <ProductBox key={product.id} product={product} />
              })
            }
          </div>
        }
      </div>
    </section>
  )
}
