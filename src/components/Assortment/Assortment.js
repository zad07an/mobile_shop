import React from 'react'
import * as FontAwesom from 'react-icons';
import './Assortment.css'
import { useNavigate } from 'react-router-dom';
import { tabTitle } from '../../PageTabTitle/pageTabTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/ProductsSlice';

export default function Assortment() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const {data: products, status} = useSelector((state) => state.products)

  tabTitle('Տեսականի - MobiShop')

  const goToCategory = (nav) => {
    navigate(`/shop/${nav}`)
  }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const getCategories = (products) => {
    const categories = products.map((product) => {
      return product.category
    })
    return [...new Set(categories)]
  }

  const uniqueCategories = getCategories(products);
  return (
    <div className='assortment_container'>
      <div className="assortment_box">
        {
          uniqueCategories.map((item, idx) => {
            return (
              <div key={idx} className='assortment_category_box' onClick={() => goToCategory(item)}>
                {/* <AiOutlineMobile className="assortment_icon" />  */}
                <p>{item}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
