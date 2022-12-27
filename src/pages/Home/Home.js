import React from 'react'
import SliderComp from '../../components/Slider/Slider'
import './Home.css'
import ProductBox from '../../components/ProductBox/ProductBox'

export default function Home({ productsType, addToCart }) {

  const productsName = ['Հեռախոսներ', 'Պլանշետներ', 'Ժամացույցներ', 'Հեռուստացույցներ', 'Համակարգիչներ', 'Նոթբուքեր', 'Աքսեսուարներ', 'Տեսախցիկներ']

  return (
    <section className='home_container'>
      <SliderComp />
      <div className='products_banner'>
        {
          productsName.slice(0, 8).map((product) => {
            return (
              <div className='each_product'>
                <p>{product}</p>
              </div>
            )
          })
        }
      </div>
      <div className="dislpay_products">
        <div className="display_product_title">
          <h2>Հեռախոսներ</h2>
        </div>
        <div className="products_list">
          {
            productsType.map((product) => {
              return <ProductBox key={product.id} product={product} addToCart={addToCart} />
            })
          }
        </div>
      </div>
    </section>
  )
}
