import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Pagination.css'

export default function Pagination({ products, postPerPage, currentPage, setCurrentPage, productsSectionRef, shopProductsRef }) {
  const pages = [];
  const [pageParams, setPageParams] = useSearchParams();

  for (let i = 1; i <= Math.round(products.length / postPerPage); i++) {
    pages.push(i)
  }

  // useEffect(() => {
  //   setPageParams(`/page/${pages[0]}`)
  // }, [])

  const onPageChange = (page) => {
    setCurrentPage(page);
    setPageParams(`/page/${page}`)
    window.scrollTo({
      top: productsSectionRef.current.offsetTop - 60
    })
  }

  return (
    <div className='pagination_container'>
      {
        pages.map((page, index) => {
          return <button key={index} className={page === currentPage ? 'active_page' : ''} onClick={() => onPageChange(page)}>{page}</button>
        })
      }
    </div>
  )
}
