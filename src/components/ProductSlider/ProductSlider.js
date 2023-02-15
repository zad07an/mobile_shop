import React from 'react'
import { useState } from 'react';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs';
import './ProductSlider.css'

export default function ProductSlider({ product }) {
  const [index, setIndex] = useState(0);
  const prevSlide = () => setIndex((prevIndex) => prevIndex < 1 ? product.length - 1 : prevIndex - 1)
  const nextSlide = () => setIndex((prevIndex) => prevIndex === product.length - 1 ? 0 : prevIndex + 1)

  return (
    <>
      <div className='product_slider'>
        <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
          {
            product.map((slide, index) => {
              return (
                <>
                  <div key={index} className="each_image" style={{ background: `url(${slide})`, objectFit: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                    <div>
                      <p>{index + 1} / {product.length}</p>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
        {
          product.length <= 1 ?
          null :
          <>
            <div className="prev_arrow" onClick={prevSlide}><BsArrowLeftShort /></div>
            <div className="next_arrow" onClick={nextSlide}><BsArrowRightShort/></div>
          </>
        }
      </div>
      <div className='bottom_slider'>
        {
          product.map((slide, idx) => {
            return (
              <div key={idx} className={`bottom_slide${index === idx ? " active" : ""}`} style={{ background: `url(${slide})`, backgroundSize: 'cover' }}  onClick={() => { setIndex(idx)}}></div>
            )
          })
        }
      </div>
    </>
  )
}
