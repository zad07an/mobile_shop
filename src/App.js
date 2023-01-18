import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import UseScrollToTop from "./Hooks/UseScrollToTop";
import Favorite from "./pages/Favorite/Favorite";
import "./App.css";
import Compare from "./pages/Compare/Compare";
import Login from "./pages/Login/Login";
import Shop from "./pages/Shop/Shop";
import Register from "./pages/Register/Register";

function App() {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();

  const onShowMenu = () => setMenu(!menu);
  const onCloseMenu = () => setMenu(false);

  useEffect(() => {
    const menuHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", menuHandler);

    return () => document.removeEventListener("mousedown", menuHandler);
  }, []);

  return (
    <div className='App'>
      <UseScrollToTop />
      <Routes>
        <Route
          element={
            <Layouts
              onShowMenu={onShowMenu}
              onCloseMenu={onCloseMenu}
              menu={menu}
              menuRef={menuRef}
            />
          }>
          <Route path='/' element={<Home />} />
          <Route path='/basket' element={<Cart />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/compare' element={<Compare />} />
          <Route path="/shop/:id" element={<Shop/>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
