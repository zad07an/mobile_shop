import React from 'react'
import './EachSlider.css'

export default function EachSlide({index, slide}) {
  return (
    <div className="slide" key={index} style={{ background: `url(${slide.url})`, backgroundSize: 'cover' }} >
      <div className='slide_text'>
        <div>
          <p>{slide.title}</p>
          <span>{slide.description}</span>
        </div>
      </div>
    </div>
  )
}
