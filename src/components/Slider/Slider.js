import React, { useState, useEffect, useRef } from "react";
import EachSlide from "./EachSlide/EachSlide";
import { SliderData } from './SliderData'
import {MdArrowBackIos, MdArrowForwardIos} from 'react-icons/md'
import './Slider.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchSliderImages } from "../../store/SliderSlice";

export default function SliderComp() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const {slideData} = useSelector((state) => state.slider)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    dispatch(fetchSliderImages())
  }, [dispatch])

  const prevSlide = () => {
    setIndex((prevIndex) => prevIndex < 1 ? slideData.length - 1 : prevIndex - 1)
  }

  const nextSlide = () => {
    setIndex((prevIndex) => prevIndex === slideData.length - 1 ? 0 : prevIndex + 1)
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => prevIndex === slideData.length - 1 ? 0 : prevIndex + 1)
    }, 4000);

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {slideData.map((slide, index) => {
          return <EachSlide key={index} slide={slide} />
        })}
      </div>
      <div className="slideshowDots">
        {slideData.map((_, idx) => (
          <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} onClick={() => { setIndex(idx)}}></div>
        ))}
      </div>
      <div className="prev_arrow" onClick={prevSlide}><MdArrowBackIos /></div>
      <div className="next_arrow" onClick={nextSlide}><MdArrowForwardIos/></div>
    </div>
  );
}