import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { productData } from './Data/Products';
import Layouts from './layouts/Layouts';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import './App.css';

function App() {

  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const [productsType, setProductsType] = useState([...productData]);
  const [cartProducts, setCartProducts] = useState([]);

  const onShowMenu = () => setMenu(!menu);
  const onCloseMenu = () => setMenu(false);

  const addToCart = (product) => {
    const productExist = cartProducts.find((item) => item.id === product.id);
    if (productExist) {
      setCartProducts(cartProducts.map((item) => item.id === product.id ?
        { ...productExist, stock: --productExist.stock, quantity: ++productExist.quantity } : item),
      )
      setProductsType(productsType.map((item) => item.id === product.id ?
      { ...productExist, stock: --productExist.stock, quantity: ++productExist.quantity } : item))
    } else {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (product) => {
    const productExist = cartProducts.find((item) => item.id === product.id);
    if (productExist.quantity === 1) {
      setCartProducts(cartProducts.filter((item) => item.id !== product.id));
    } else {
      setCartProducts(cartProducts.map((item) => item.id === product.id ? { ...productExist, stock: ++productExist.stock, quantity: --productExist.quantity } : item))
      setProductsType(productsType.map((item) => item.id === product.id ?
      { ...productExist, stock: ++productExist.stock, quantity: --productExist.quantity } : item))
    }
  }

  const removeCartProduct = (product) => {
    setCartProducts(cartProducts.filter((item) => item.id !== product.id))
  }

  const removeAllCartProducts = () => setCartProducts([])

  useEffect(() => {
    const menuHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setMenu(false)
      }
    }
    document.addEventListener('mousedown', menuHandler);

    return () => document.removeEventListener('mousedown', menuHandler);
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<Layouts onShowMenu={onShowMenu} onCloseMenu={onCloseMenu} menu={menu} menuRef={menuRef} cartProducts={cartProducts} />}>
          <Route path='/' element={<Home productsType={productsType} addToCart={addToCart} />} />
          <Route path='/basket' element={<Cart cartProducts={cartProducts} addToCart={addToCart} removeFromCart={removeFromCart} removeCartProduct={removeCartProduct} removeAllCartProducts={removeAllCartProducts} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
