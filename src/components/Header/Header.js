import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import {RiShoppingCartLine, RiShoppingCartFill} from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { MdCompareArrows } from 'react-icons/md'
import { useSelector } from 'react-redux'
import './Header.css'

export default function Header({ onShowMenu, onCloseMenu, menu, menuRef }) {

  const productQuantity = useSelector((state) => state.cart.cartProducts);
  const favortieProductsQuantity = useSelector((state) => state.favorite.favoriteProducts);
  const compareProductsQuantity = useSelector((state) => state.compare.compareProducts);

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
              <NavLink to="/shop/all" className={isActiveLink} onClick={onCloseMenu}>Տեսականի</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to='/about' className={isActiveLink} onClick={onCloseMenu}>Զեղչված տեսականի</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/about_us" className={isActiveLink} onClick={onCloseMenu}>Մեր մասին</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/experience" className={isActiveLink} onClick={onCloseMenu}>Ապառիկ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/shop/all" className={isActiveLink} onClick={onCloseMenu}>Խանութներ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Կապ</NavLink>
            </li>
            <li className="nav_list">
              <NavLink to="/contact" className={isActiveLink} onClick={onCloseMenu}>Աշխատատեղեր</NavLink>
            </li>
            <li className="nav_list nav_my_fav_list">
              <NavLink to="/favorites" className={isActiveLink} onClick={onCloseMenu}>Իմ Ֆավորիտները - {favortieProductsQuantity.length}</NavLink>
            </li>
            <li className="nav_list nav_my_cart_list">
              <NavLink to="/basket" className={isActiveLink} onClick={onCloseMenu}>Իմ Զամբյուղը - {productQuantity.length}</NavLink>
            </li>
            <li className="nav_list nav_compare_list">
              <NavLink to="/compare" className={isActiveLink} onClick={onCloseMenu}>Համեմատում - {compareProductsQuantity.length}</NavLink>
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
          <div className="fav_box" onClick={() => navigate('/favorites')}>
            {favortieProductsQuantity.length > 0 ?
              <><FaHeart size={28} color='white' /></> :
              <><FaRegHeart size={28} color='white' /></>}
            <div className='my_fav'>
              <p>Իմ Ֆավորիտները</p>
              <span>Ապրանք - <div className='product_count_circle'>{favortieProductsQuantity.length}</div></span>
            </div>
            <p className='fav_count'>{favortieProductsQuantity.length}</p>
          </div>
          <div className="cart_box" onClick={() => navigate('/basket')}>
            {productQuantity.length > 0 ?
              <><RiShoppingCartFill size={28} color='white' /></> :
              <><RiShoppingCartLine size={28} color='white' /></>}
            <div className='my_basket'>
              <p>Իմ Զամբյուղը</p>
              <span>Ապրանք - <div className='product_count_circle'>{productQuantity.length}</div></span>
            </div>
            <p className="cart_count">{productQuantity.length}</p>
          </div>
          <div className="compare_box" onClick={() => navigate('/compare')}>
            <MdCompareArrows size={28} color='white'/>
            <div className='my_compare'>
              <p>Համեմատում</p>
              <span>Ապրանք - <div className='product_count_circle'>{compareProductsQuantity.length}</div></span>
            </div>
            <p className="compare_count">{compareProductsQuantity.length}</p>
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
