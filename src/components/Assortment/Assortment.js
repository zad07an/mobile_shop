import React from 'react'
import { GiDelicatePerfume, GiBedLamp, GiOpenedFoodCan } from 'react-icons/gi'
import { AiOutlineMobile } from 'react-icons/ai';
import { MdComputer } from 'react-icons/md';
import './Assortment.css'
import { useNavigate } from 'react-router-dom';
import { tabTitle } from '../../PageTabTitle/pageTabTitle';

export default function Assortment() {

  const navigate = useNavigate();

  tabTitle('Տեսականի - MobiShop')

  const goToCategory = (nav) => {
    navigate(`/shop/${nav}`)
  }

  return (
    <div className='assortment_container'>
      <div className="assortment_box">
        <div className='assortment_category_box' onClick={() => goToCategory('smartphones')}>
          <AiOutlineMobile className="assortment_icon" />
          <p>Հեռախոսներ</p>
        </div>
        <div className='assortment_category_box' onClick={() => goToCategory('laptops')}>
          <MdComputer className="assortment_icon" />
          <p>Նոթբուքեր</p>
        </div>
        <div className='assortment_category_box' onClick={() => goToCategory('fragrances')}>
          <GiDelicatePerfume className="assortment_icon" />
          <p>Օծանելիքներ</p>
        </div>
        <div className='assortment_category_box' onClick={() => goToCategory('skincare')}>
          <GiOpenedFoodCan className="assortment_icon" />
          <p>Մթերային</p>
        </div>
        <div className='assortment_category_box' onClick={() => goToCategory('groceries')}>
          <GiDelicatePerfume className="assortment_icon" />
          <p>Մաշկի խնամք</p>
        </div>
        <div className='assortment_category_box' onClick={() => goToCategory('home-decoration')}>
          <GiBedLamp className="assortment_icon" />
          <p>Տան դեկորացիա</p>
        </div>
      </div>
    </div>
  )
}
