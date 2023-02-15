import React, { useCallback, useState } from 'react'
import { BsStarFill, BsStarHalf } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { incrementRating } from '../../store/ProductsSlice'
import './Rating.css'

export default function Rating({ product }) {

  const [ratingHover, setRatingHover] = useState(undefined);
  const dispatch = useDispatch()

  const onRatingEnter = useCallback((val) => {
    setRatingHover(val)
  }, []);

  const onRatingLeave = useCallback(() => {
    setRatingHover(undefined)
  }, []);

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index} className='rating_stars' onMouseOver={() => onRatingEnter(index + 1)} onMouseLeave={onRatingLeave} onClick={() => dispatch(incrementRating({ product, index }))}>
        {
          ratingHover > index ? <BsStarFill color='goldenrod' size={16}/> : ratingHover <= index ? <BsStarFill color='#ccc' size={16}/> :
          product.rating >= index + 1 ? <BsStarFill color='goldenrod' size={16}/> : product.rating >= number ? <BsStarHalf color='goldenrod' size={16}/> : <BsStarFill color='#ccc' size={16}/>
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
