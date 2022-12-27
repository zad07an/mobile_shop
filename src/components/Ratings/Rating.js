import React from 'react'
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'
import './Rating.css'

export default function Rating({ product }) {

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index} className='rating_stars'>
        {
          product.rating >= index + 1 ? <BsStarFill color='goldenrod'/> : product.rating >= number ? <BsStarHalf color='goldenrod'/> : <BsStar color='goldenrod'/>
        }
      </span>
    )
  })

  return (
    <>
      {ratingStar}
    </>
  )
}
