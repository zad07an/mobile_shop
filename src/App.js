import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { productData } from './Data/Products';
import Layouts from './layouts/Layouts';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import './App.css';
import { ShopContextProvider } from './Context/ShopContext';

function App() {

  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const [productsType, setProductsType] = useState([...productData]);

  const onShowMenu = () => setMenu(!menu);
  const onCloseMenu = () => setMenu(false);

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
      <ShopContextProvider>
        <Routes>
          <Route element={<Layouts onShowMenu={onShowMenu} onCloseMenu={onCloseMenu} menu={menu} menuRef={menuRef} />}>
            <Route path='/' element={<Home productsType={productsType}  />} />
            <Route path='/basket' element={<Cart  />} />
          </Route>
        </Routes>
      </ShopContextProvider>
    </div>
  );
}

export default App;
