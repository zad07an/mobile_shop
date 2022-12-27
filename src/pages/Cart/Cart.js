import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CartBox from '../../components/CartBox/CartBox'
import { ShopContext } from '../../Context/ShopContext'
import { productData } from '../../Data/Products'
import './Cart.css'

export default function Cart() {

  const {cartProducts, clearAllCartProducts, getTotalPrice} = useContext(ShopContext);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  // const totalPrice = cartProducts.reduce((price, item) => price + item.quantity * item.price, 0)

  return (
    <section className='cart_container'>
      <div className="basket_box">
        <div className="basket_subtitle">
          <h2>Զամբյուղ</h2>
        </div>
        {
          totalPrice === 0
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
                  productData.map((product) => {
                    if (cartProducts[product.id] !== 0) {
                      return <CartBox key={product.id} product={product} />
                    }
                  })
                }
              </tbody>
            </table>
            <div className='basket_total_price'>
              <button onClick={clearAllCartProducts}>Հեռացնել Ամբողջը</button>
                <p>Ընդանուր գումարը` {totalPrice}դր․</p>
            </div>
          </div>
        }
      </div>
    </section>
  )
}
