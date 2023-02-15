import React from 'react'
import { FiSearch } from 'react-icons/fi'
import './SearchBox.css'

export default function SearchBox({showSearchContainer}) {
  return (
    <section className={showSearchContainer}>
      <form className='active_search_box'>
        <div className='search_active'>
          <input type='text' name='search' placeholder='Որոնում...' autoFocus required/>
          <button><FiSearch/></button>
        </div>
      </form>
    </section>
  )
}
