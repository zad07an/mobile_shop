import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export default function Layouts({onShowMenu, onCloseMenu, menu, menuRef, cartProducts}) {
  return (
    <>
      <Header onShowMenu={onShowMenu} onCloseMenu={onCloseMenu} menu={menu} menuRef={menuRef} cartProducts={cartProducts} />
      <Outlet />
      <Footer/>
    </>
  )
}
