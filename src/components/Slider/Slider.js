import React, { useState, useEffect, useRef } from "react";
import EachSlide from "./EachSlide/EachSlide";
import { SliderData } from './SliderData'
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md'
import './Slider.css'

export default function SliderComp() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const prevSlide = () => {
    setIndex((prevIndex) => prevIndex < 1 ? SliderData.length - 1 : prevIndex - 1)
  }

  const nextSlide = () => {
    setIndex((prevIndex) => prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1)
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1)
    }, 4000);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {SliderData.map((slide, index) => {
          return <EachSlide key={index} slide={slide} />
        })}
      </div>
      <div className="slideshowDots">
        {SliderData.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => { setIndex(idx)}}></div>
        ))}
      </div>
      <div className="prev_arrow" onClick={prevSlide}><MdArrowBackIos /></div>
      <div className="next_arrow" onClick={nextSlide}><MdArrowForwardIos/></div>
    </div>
  );
}