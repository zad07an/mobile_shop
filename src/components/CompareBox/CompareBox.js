import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteCompareProduct, removeFromCompare } from '../../store/CompareSlice'
import './CompareBox.css'

export default function CompareBox({ product }) {

  const dispatch = useDispatch();

  const handleDeleteCompareProduct = async () => {
    try {
      dispatch(deleteCompareProduct(product.id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='compare_product_box'>
      <div className="compare_remove_box" onClick={handleDeleteCompareProduct}>
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
      <div className="compare_title_box">
        <span>Դիսփլեյի չափսը:</span>
        <p>{product.display_size.toFixed(2)}"</p>
      </div>
      <div className="compare_title_box">
        <span>Էկրանի կետայնությունը:</span>
        <p>{product.display_resolution}</p>
      </div>
      <div className="compare_title_box">
        <span>Դիսփլեյի տեխնոլոգիա:</span>
        <p>{product.display_technology}</p>
      </div>
      <div className="compare_title_box">
        <span>Հիշողություն:</span>
        <p>{product.storage}</p>
      </div>
      <div className="compare_title_box">
        <span>Պրոցեսոր:</span>
        <p>{product.processor}</p>
      </div>
      <div className="compare_title_box">
        <span>Պրոցեսորի միջուկների քանակը:</span>
        <p>{product.processor_cores}</p>
      </div>
      <div className="compare_title_box">
        <span>Գույն։</span>
        <p>{product.color_name}</p>
      </div>
      <div className="compare_price_box">
        <span>Գին։</span>
        <p>{product.price} <span>AMD</span></p>
      </div>
    </div>
  )
}
