import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { HiMenuAlt3, HiOutlineShoppingCart } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { MdCompareArrows } from 'react-icons/md'
import './Header.css'
import { ShopContext } from '../../Context/ShopContext'

export default function Header({ onShowMenu, onCloseMenu, menu, menuRef }) {

  // const {} = useContext(ShopContext);

  // const cartLength = getCartLength()

  const navigate = useNavigate();
  const showMenu = menu ? 'show_menu' : '';
  const showMenuContainer = menu ? 'active_menu_overlay' : 'inactive_menu_overlay';
  const isActiveLink = ({ isActive }) => (isActive ? 'isActive' : 'nav_link')
  menu ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';

  return (
    <header className='header'>
      <nav className='nav'>
        <Link to="/" className="logo">MobiShop</Link>
        <span className={`${showMenuContainer}`}></span>
        <div ref={menuRef} className={`nav_items ${showMenu}`}>
          <ul className="nav_menu">
            <li className="nav_list">
              <NavLink to="/" className={isActiveLink} onClick={onCloseMenu}>Տեսականի</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to='/about' className={isActiveLink} onClick={onCloseMenu}>Զեղչված տեսականի</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/projects" className={isActiveLink} onClick={onCloseMenu}>Մեր մասին</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/experience" className={isActiveLink} onClick={onCloseMenu}>Ապառիկ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Խանութներ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Կապ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Աշխատատեղեր</NavLink>
            </li>
            <li className="nav_list nav_my_fav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Իմ Ֆավորիտները - 0</NavLink>
            </li>
            <li className="nav_list nav_my_cart_list">
              <NavLink to="/basket" className={isActiveLink} onClick={onCloseMenu}>Իմ Զամբյուղը - 0</NavLink>
            </li>
            <li className="nav_list nav_compare_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Համեմատում - 0</NavLink>
            </li>
          </ul>
          <div className='close_menu' onClick={onCloseMenu}>
            <AiOutlineClose size={30} color='white'/>
          </div>
        </div>
        <div className="menu_cart_fav_login_items">
          <form className='nav_search'>
            <div className='search_box'>
              <input type='text' placeholder='Որոնում...' autoFocus required/>
              <button><FiSearch/></button>
            </div>
          </form>
          <div className="fav_box">
            <FaRegHeart size={28} color='white' />
            <div className='my_fav'>
              <p>Իմ Ֆավորիտները</p>
              <span>Ապրանք - 0</span>
            </div>
            <p className='fav_count'>0</p>
          </div>
          <div className="cart_box" onClick={() => navigate('/basket')}>
            <HiOutlineShoppingCart size={28} color='white'/>
            <div className='my_basket'>
              <p>Իմ Զամբյուղը</p>
              <span>Ապրանք - 0</span>
            </div>
            <p className="cart_count">0</p>
          </div>
          <div className="compare_box">
            <MdCompareArrows size={28} color='white'/>
            <div className='my_compare'>
              <p>Համեմատում</p>
              <span>Ապրանք - 0</span>
            </div>
            <p className="compare_count">0</p>
          </div>
          <div className="login_box">
            <BiUserCircle size={28} color='white'/>
            <span>Մուտք</span>
          </div>
          <div className="hamburger_menu" onClick={onShowMenu}>
            <HiMenuAlt3 size={30} color='white' />
          </div>
        </div>
      </nav>
    </header>
  )
}
