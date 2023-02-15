import React, { useCallback, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { HiMenuAlt3 } from 'react-icons/hi'
import {RiShoppingCartLine, RiShoppingCartFill} from 'react-icons/ri'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { MdOutlineLogout } from 'react-icons/md'
import { TbArrowsShuffle } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import SearchBox from '../SearchBox/SearchBox'
import { useEffect } from 'react'
import { userLogout } from '../../store/UserSlice'

export default function Header({ onShowMenu, onCloseMenu, menu, menuRef }) {

  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef();
  const activeSearchRef = useRef();
  const productQuantity = useSelector((state) => state.cart.cartProducts);
  const favortieProductsQuantity = useSelector((state) => state.favorite.favoriteProducts);
  const compareProductsQuantity = useSelector((state) => state.compare.compareProducts);
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const showMenu = menu ? 'show_menu' : '';
  const showMenuContainer = menu ? 'active_menu_overlay' : 'inactive_menu_overlay';
  const showSearchContainer = showSearch ? 'active_search_overlay' : 'inactive_search_overlay';

  const isActiveLink = ({ isActive }) => (isActive ? 'isActive' : 'nav_link')

  menu ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';

  showSearch ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';

  const onOpenSearch = useCallback(() => setShowSearch(!showSearch), [showSearch])

  useEffect(() => {
    searchRef.current.focus()
  }, [])

  useEffect(() => {
    const searchHandler = (e) => {
      if (!activeSearchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", searchHandler);
    return () => document.removeEventListener("mousedown", searchHandler);
  }, []);

  const onLogOut = () => {
    dispatch(userLogout())
    navigate('/login')
  }

  const onHomePage = () => {
    window.scrollTo(0,0)
  }



  return (
    <>
      <header className='header'>
        <nav className='nav'>
          <Link to="/" className="logo" onClick={onHomePage}>MobiShop</Link>
          <span className={`${showMenuContainer}`}></span>
          <div ref={menuRef} className={`nav_items ${showMenu}`}>
            <ul className="nav_menu">
              <li className="nav_list">
                <NavLink to="/assortment" className={isActiveLink} onClick={onCloseMenu}>Տեսականի</NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/about_us" className={isActiveLink} onClick={onCloseMenu}>Մեր մասին</NavLink>
              </li>
              <li className="nav_list">
                <NavLink to="/credit" className={isActiveLink} onClick={onCloseMenu}>Ապառիկ</NavLink>
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
                <input ref={searchRef} type='text' name='search' placeholder='Որոնում...' required/>
                <button><FiSearch/></button>
                <span ref={activeSearchRef} className='active_search_icon' onClick={onOpenSearch}><FiSearch/></span>
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
              <TbArrowsShuffle size={28} color='white'/>
              <div className='my_compare'>
                <p>Համեմատում</p>
                <span>Ապրանք - <div className='product_count_circle'>{compareProductsQuantity.length}</div></span>
              </div>
              <p className="compare_count">{compareProductsQuantity.length}</p>
            </div>
            <div className="login_box">
              {
                user.userLogged ?
                (
                <div className='user_logout' onClick={onLogOut}>
                  <MdOutlineLogout size={28} color='white'/>
                  <span>Ելք</span>
                </div>
                ) :
                (
                <div className='user_login' onClick={() => navigate('/login')}>
                  <BiUserCircle size={28} color='white'/>
                  <span>Մուտք</span>
                </div>
                )
              }
            </div>
            <div className="hamburger_menu" onClick={onShowMenu}>
              <HiMenuAlt3 size={30} color='white' />
            </div>
          </div>
        </nav>
      </header>
      {
        showSearch ? <SearchBox showSearchContainer={showSearchContainer} /> : null
      }
    </>
  )
}
