import React from 'react'
import './EachSlide.css'

export default function EachSlide({index, slide}) {
  return (
    <div className="slide" key={index} style={{ background: `url(${slide.url})` }} >
      <div className='slide_text'>
        <p>{slide.title}</p>
        <span>{slide.description}</span>
      </div>
    </div>
  )
}
