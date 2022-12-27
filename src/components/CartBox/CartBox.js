import React, { useContext } from 'react'
import {RiCloseFill} from 'react-icons/ri'
import { ShopContext } from '../../Context/ShopContext'
import './CartBox.css'

export default function CartBox({product}) {

  const {cartProducts, addToCart, removeFromCart, removeProductFromCart, getProductSubtotal} = useContext(ShopContext);

  const totalPrice = getProductSubtotal(product.id);
  const productArr = [];
  productArr.push(product);
  // const totalPrice = productArr.reduce((price, item) => price + item.quantity * item.price, 0)
  const buyButtonStyle = product.stock === 0 ? { background: 'gray', cursor: 'auto'} : null;

  return (
    <tr key={product.id} className='basket_product_box'>
      <td className='remove_table_cell'>
          <button onClick={() => removeProductFromCart(product.id)}>
            <RiCloseFill />
          </button>
      </td>
      <td className='image_table_cell'>
        <div className="basket_product_image">
          <img src={product.thumbnail} alt="" />
        </div>
      </td>
      <td className='name_table_cell'>{product.title}</td>
      <td className='price_table_cell'>{product.price}դր․</td>
      <td className='count_table_cell'>
        <button onClick={() => removeFromCart(product.id)}>-</button>
        <div className="basket_product_quantity">
          <p>{cartProducts[product.id]}</p>
        </div>
        <button onClick={() => addToCart(product.id)} style={buyButtonStyle} disabled={product.stock === 0}>+</button>
      </td>
      <td className='total_price_table_cell'>{totalPrice}դր․</td>
    </tr>
  )
}
