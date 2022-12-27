import React, { useContext } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { MdCompareArrows } from 'react-icons/md'
import Rating from '../../components/Ratings/Rating'
import { ShopContext } from '../../Context/ShopContext'
import './ProductBox.css'

export default function ProductBox({ product }) {

  const {cartProducts, addToCart } = useContext(ShopContext);

  const productCount = cartProducts[product.id]

  const availablityStyle = product.stock === 0 ? 'product_not_available' : product.stock <= 25 ? 'product_limited' : 'product_available'

  const buyButtonStyle = product.stock === 0 ? { background: 'gray', cursor: 'auto'} : null;

  return (
    <div key={product.id} className='product_box'>
      <div className={`product_availablity ${availablityStyle}`}>
        <p>
          {
            product.stock === 0 ? `Առկա չէ` : product.stock <= 25 ? `Սահմանապակ է ${product.stock}` : `Առկա է ${product.stock}`
          }
        </p>
      </div>
      <div className='product_image'>
        <img src={product.thumbnail} alt="" />
      </div>
      <div className='product_name'>
        <p>{product.title}</p>
        <span>{product.price}դր․</span>
      </div>
      <div className="product_per_month">
        <span>Ամսական {(product.price / 24).toFixed(2)}դր․</span>
        <div className='product_rating'>
          <Rating product={product}/>
        </div>
      </div>
      <div className="product_button">
        <button className="product_fav" title='Ավելացնել ընտրանում'><FaRegHeart className='fav_icon'/></button>
        <button className="product_compare" title='Համեմատել'><MdCompareArrows className='compare_icon'/></button>
        <button onClick={() => addToCart(product.id)} style={buyButtonStyle} disabled={product.stock === 0}>
          <HiOutlineShoppingCart className='basket_icon' />{productCount > 0 ? <>{productCount}</> : <>Գնել</>}
        </button>
      </div>
    </div>
  )
}
