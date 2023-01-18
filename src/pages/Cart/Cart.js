import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, getTotalAmount } from "../../store/CartSlice";
import CartBox from "../../components/CartBox/CartBox";
import {HiOutlineArrowSmLeft} from 'react-icons/hi'
import "./Cart.css";

export default function Cart() {
  // const {clearAllCartProducts, totalPrice} = useContext(ShopContext);
  const products = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userLogged);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotalAmount())
  }, [products, dispatch]);

  return (
    <section className='cart_container'>
      <div className='basket_box'>
        <div className='basket_subtitle'>
          <h2>Զամբյուղ</h2>
        </div>
        {products.cartProducts.length === 0 ? (
          <div className='basket_empty_box'>
            <div className='basket_empty'>
              <div className='left_border'></div>
              <p>Ձեր զամբյուղը դատարկ է:</p>
            </div>
            <button onClick={() => navigate("/")}>Վերադառնալ Խանութ</button>
          </div>
        ) : (
          <>
            {
              user ? null :
              <div className="cart_login_box">
                <p>Մուտք գործեք համակարգ, որպեսզի <br/> պահպանեք բոլոր գործարքների մանրամասները։</p>
                <button>Մուտք</button>
              </div>
            }
            <div className='display_cart_products'>
              <div border='1px' className='basket_products'>
                <div></div>
                <div></div>
                <div>
                  <p>Ապրանք</p>
                </div>
                <div>
                <p>Գին</p>
                </div>
                <div>
                  <p>Քանակ</p>
                </div>
              </div>
                {products.cartProducts.map((product) => {
                  return <CartBox key={product.id} product={product} />;
                })}
              <div className='basket_total_price'>
                <div className="basket_total_price_clear">
                  <button onClick={() => dispatch(clearCart(products.cartProducts))}>Հեռացնել Ամբողջը</button>
                  <p>Ընդանուր գումարը` {products.cartTotalAmount}դր․</p>
                </div>
              </div>
            </div>
          </>
        )}
        {
          products.cartProducts.length === 0 ? null :
            <>
              <form action="" className="basket_form" autoComplete="false">
                <div className="bsket_form_title">
                  <h2>Առաքման տվյալներ</h2>
                </div>
              <div className="basket_form_grid">
                <div className="basket_form_fname_lname">
                  <div className="basket_form_fname">
                    <label htmlFor="fname">Անուն*</label>
                    <input type="text" name="firstName" id="fname" placeholder="Գրեք ձեր անունը" />
                  </div>
                  <div className="basket_form_lname">
                    <label htmlFor="lname">Ազգանուն*</label>
                    <input type="text" name="lastName" id="lname" placeholder="Գրեք ձեր ազգանունը" />
                  </div>
                </div>
                <div className="basket_form_tel_email">
                  <div className="basket_form_tel">
                    <label htmlFor="tel">Բջջային հեռախոս*</label>
                    <input type="tel" name="phoneNumber" id="tel" placeholder="Գրեք ձեր բջջային հեռախոսահամարը" />
                  </div>
                  <div className="basket_form_email">
                    <label htmlFor="email">Էլ․ փոստ*</label>
                    <input type="email" name="email" id="email" placeholder="Գրեք ձեր էլ․ հասցեն" />
                  </div>
                </div>
              </div>
              <div className="basket_box_address">
                <label htmlFor="address">Հասցե*</label>
                  <input type="address" name="address" id="address" placeholder="Գրեք ձեր տուն/շենք/փողոց" />
              </div>
              <div className="basket_form_message">
                <label htmlFor="message">Նշումներ*</label>
                <textarea name="message" id="message" placeholder="Կատարեք նշումներ"></textarea>
              </div>
              <div className="basket_return_shop_checkout">
                <Link to='/'><HiOutlineArrowSmLeft size={22}/>Շարունակել գնումները</Link>
                <button>Վճարել</button>
              </div>
            </form>
          </>
        }
      </div>
    </section>
  );
}
