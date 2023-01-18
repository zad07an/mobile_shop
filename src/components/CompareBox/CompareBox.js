import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { removeFromCompare } from '../../store/CompareSlice'
import './CompareBox.css'

export default function CompareBox({ product }) {

  const dispatch = useDispatch();

  return (
    <div className='compare_product_box'>
      <div className="compare_remove_box" onClick={() => dispatch(removeFromCompare(product))}>
        <FaTimes size={20} color='red'/>
      </div>
      <div className="compare_image_box">
        <img src={product.thumbnail} alt="" />
      </div>
      <div className="compare_brand_box">
        <span>Բռենդ։</span>
        <p>{product.brand}</p>
      </div>
      <div className="compare_title_box">
        <span>Մոդել։</span>
        <p>{product.title}</p>
      </div>
      <div className="compare_price_box">
        <span>Գին։</span>
        <p>{product.price}դր․</p>
      </div>
    </div>
  )
}
