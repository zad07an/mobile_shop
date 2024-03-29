import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import UseScrollToTop from "./Hooks/UseScrollToTop";
import Favorite from "./pages/Favorite/Favorite";
import Compare from "./pages/Compare/Compare";
import Login from "./pages/Login/Login";
import Shop from "./pages/Shop/Shop";
import Register from "./pages/Register/Register";
import "./App.css";
import Details from "./pages/Details/Details";
import About from "./pages/About/About";
import Credit from "./pages/Credit/Credit";
import Assortment from "./components/Assortment/Assortment";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "./store/CartSlice";
import { fetchFavoriteProducts } from "./store/FavoriteSlice";
import { fetchCompareProducts } from "./store/CompareSlice";

function App() {

  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const dispatch = useDispatch();
  const {cartProducts} = useSelector((state) => state.cart);
  const {favoriteProducts} = useSelector((state) => state.favorite);
  const {compareProducts} = useSelector((state) => state.compare);

  const onShowMenu = useCallback(() => setMenu(!menu), [menu]);
  const onCloseMenu = useCallback(() => setMenu(false), []);

  useEffect(() => {
    const menuHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", menuHandler);
    return () => document.removeEventListener("mousedown", menuHandler);
  }, []);

  useEffect(() => {
    dispatch(fetchCartProducts())
    dispatch(fetchFavoriteProducts());
    dispatch(fetchCompareProducts())
  }, [dispatch])

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
          <Route path='/about_us' element={<About />} />
          <Route path='/credit' element={<Credit />} />
          <Route path='/assortment' element={<Assortment  />} />
          <Route path='/basket' element={<Cart cartProducts={cartProducts}/>} />
          <Route path='/favorites' element={<Favorite favoriteProducts={favoriteProducts} />} />
          <Route path='/compare' element={<Compare compareProducts={compareProducts} />} />
          <Route path="/shop/:id" element={<Shop/>} />
          {/* <Route path="/shop/:category/product/:productId/:productName/" element={<Details/>} /> */}
          <Route path="/shop/:productCategory/product/:productId/:productName" element={<Details/>} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
