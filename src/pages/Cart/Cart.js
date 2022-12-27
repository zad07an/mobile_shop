import React from 'react'
import { useNavigate } from 'react-router-dom'
import CartBox from '../../components/CartBox/CartBox'
import './Cart.css'

export default function Cart({cartProducts, addToCart, removeFromCart, removeCartProduct, removeAllCartProducts}) {

  const navigate = useNavigate();
  const totalPrice = cartProducts.reduce((price, item) => price + item.quantity * item.price, 0)

  return (
    <section className='cart_container'>
      <div className="basket_box">
        <div className="basket_subtitle">
          <h2>Զամբյուղ</h2>
        </div>
        {
          cartProducts.length === 0
          ?
          <div className='basket_empty_box'>
            <div className='basket_empty'>
              <div className='left_border'></div>
              <p>Ձեր զամբյուղը դատարկ է:</p>
            </div>
            <button onClick={() => navigate('/')}>Վերադառնալ Խանութ</button>
          </div>
          :
          <div className='display_cart_products'>
            <table border='1px' className="basket_products">
              <thead>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Ապրանք</td>
                  <td>Գին</td>
                  <td>Քանակ</td>
                  <td>Ենթագումար</td>
                </tr>
              </thead>
              <tbody>
                {
                  cartProducts.map((product) => {
                    return <CartBox key={product.id} product={product} addToCart={addToCart} removeFromCart={removeFromCart} removeCartProduct={removeCartProduct} cartProducts={cartProducts} />
                  })
                }
              </tbody>
            </table>
            <div className='basket_total_price'>
              <button onClick={removeAllCartProducts}>Հեռացնել Ամբողջը</button>
              <p>Ընդանուր գումարը` {totalPrice}դր․</p>
            </div>
          </div>
        }
      </div>
    </section>
  )
}
