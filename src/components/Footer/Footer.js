import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaWhatsappSquare } from 'react-icons/fa';
import { CgMail } from 'react-icons/cg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer_box'>
        <div className="footer_logo_social_medias">
          <div className="footer_logo">
            <Link to='/'>Mobi<span>Shop</span></Link>
            <p>The Customer is at the heart of out unique business model, which include design</p>
          </div>
          <div className="footer_social_medias">
            <div>
              <FaInstagramSquare className='footer_social_icons'/>
            </div>
            <div>
              <FaFacebookSquare className='footer_social_icons'/>
            </div>
            <div>
              <FaTwitterSquare className='footer_social_icons'/>
            </div>
            <div>
              <FaWhatsappSquare className='footer_social_icons'/>
            </div>
          </div>
        </div>
        <div className="footer_shopping">
          <div className="footer_shopping_title">
            <p>Shopping</p>
          </div>
          <div className="footer_shopping_links">
            <Link to=''>Clothing Store</Link>
            <Link to=''>Trending Shoes</Link>
            <Link to=''>Accessories</Link>
            <Link to=''>Sale</Link>
          </div>
        </div>
        <div className="footer_links_box">
          <div className="footer_links_title">
            <p>Links</p>
          </div>
          <div className="footer_links">
            <Link to=''>Contact Us</Link>
            <Link to=''>Payment Methods</Link>
            <Link to=''>Delivary</Link>
            <Link to=''>Return & Exchanges</Link>
          </div>
        </div>
        <div className="footer_send_message">
          <div className="footer_message_title">
            <p>Newsletter</p>
            <span>Be the first to know about new arrivals, look books, sales & promos!</span>
          </div>
          <div className="footer_message_input">
            <input type="text" placeholder='Get in touch'/>
            <div>
              <CgMail className='send_icon'/>
            </div>
          </div>
        </div>
      </div>
      <div className='footer_copyright'>
        <p>&copy; Copyright 2023. All rights reserved</p>
      </div>
    </footer>
  )
}
