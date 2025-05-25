'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function AboutContent() {
  const { cart, setCart, removeFromCart, isLoggedIn } = useApp();
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load cart from localStorage when cartVisible changes
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const updatedCart = storedItems.map((item, index) => ({
      id: index,
      name: item.title,
      price: parseInt(String(item.price).replace(/\D/g, '')) || 0,
      image: item.image,
      quantity: 1,
      description: item.description,
    }));
    setCart(updatedCart);
  }, [cartVisible, setCart]);

  // Existing useEffect for DOM event listeners
  useEffect(() => {
    const cartIcon = document.getElementById('cart-icon');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const overlay = document.getElementById('overlay');
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (cartIcon && cartOverlay && cartClose && overlay) {
      cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        overlay.style.display = 'block';
      });

      cartClose.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        overlay.style.display = 'none';
      });

      overlay.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        overlay.style.display = 'none';
      });
    }

    if (menuIcon && mobileMenu && mobileMenuClose && overlay) {
      menuIcon.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.style.display = 'block';
      });

      mobileMenuClose?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.style.display = 'none';
      });
    }

    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('open');
      });
    });
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const styles = {
    removeBtn: {
      background: 'none',
      border: 'none',
      color: '#ff4444',
      cursor: 'pointer',
      padding: '8px',
      transition: 'all 0.3s ease',
      borderRadius: '50%',
    },
    removeBtnHover: {
      backgroundColor: 'rgba(255, 68, 68, 0.1)',
      transform: 'scale(1.1)',
    },
    checkoutBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    checkoutBtnHover: {
      backgroundColor: '#45a049',
      boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    },
    checkoutAnimation: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.3s ease',
    },
    checkoutMessage: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    checkoutIcon: {
      fontSize: '24px',
      animation: 'bounce 1s infinite',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About CST Canteen</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          CST Canteen was founded with a simple mission: to provide delicious, affordable food
          to our community while maintaining the highest standards of quality and service.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We source the freshest ingredients and prepare each dish with care.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">
              We believe in providing exceptional service to every customer.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-gray-600">Head Chef</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
            <p className="text-gray-600">Manager</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
            <p className="text-gray-600">Customer Service</p>
          </div>
        </div>
      </section>

      <div className="cart-toggle" id="cart-icon" onClick={() => setCartVisible(true)}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cart.length}</span>
      </div>

      {cartVisible && (
        <>
          <div className="cart-overlay active" id="cart-overlay">
            <div className="cart-header">
              <h3>Your Orders</h3>
              <div className="cart-close" id="cart-close" onClick={() => setCartVisible(false)}>
                <i className="fas fa-times"></i>
              </div>
            </div>
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-details">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-desc">{item.description}</p>
                      <div className="cart-item-price">Nu.{item.price} x {item.quantity}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                    onMouseOver={(e) => Object.assign(e.target.style, styles.removeBtnHover)}
                    onMouseOut={(e) => Object.assign(e.target.style, styles.removeBtn)}
                    title="Remove item"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="total-amount">Total: Nu.<span>{total}</span></div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.checkoutBtn}
                onMouseOver={(e) => Object.assign(e.target.style, styles.checkoutBtnHover)}
                onMouseOut={(e) => Object.assign(e.target.style, styles.checkoutBtn)}
                onClick={() => {
                  const checkoutText = document.createElement('div');
                  checkoutText.style = { ...styles.checkoutAnimation };
                  checkoutText.innerHTML = `
                    <div style="${Object.entries(styles.checkoutMessage).map(([key, value]) => `${key}: ${value}`).join(';')}">
                      <i class="fas fa-check-circle" style="${Object.entries(styles.checkoutIcon).map(([key, value]) => `${key}: ${value}`).join(';')}"></i>
                      <span>Processing your order...</span>
                    </div>
                  `;
                  document.querySelector('.cart-total').appendChild(checkoutText);
                  
                  setTimeout(() => {
                    checkoutText.remove();
                  }, 2000);
                }}
              >
                Checkout Now
              </motion.button>
            </div>
          </div>
          <div className="overlay" id="overlay" onClick={() => setCartVisible(false)}></div>
        </>
      )}

      <div className="overlay" id="overlay"></div>

      <div className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>Menu</h3>
              <ul>
                <li><a href="#">Breakfast</a></li>
                <li><a href="#">Lunch</a></li>
                <li><a href="#">Dinner</a></li>
                <li><a href="#">Snacks</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Categories</h3>
              <ul>
                <li><a href="#">Bhutanese</a></li>
                <li><a href="#">Fast Food</a></li>
                <li><a href="#">Beverages</a></li>
                <li><a href="#">Weekly Specials</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Information</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Payment Options</a></li>
                <li><a href="#">Track Order</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Meal Plans</a></li>
                <li><a href="#">Nutritional Info</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Follow us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#">Data settings</a>
            <a href="#">Cookie settings</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms And Conditions</a>
            <a href="#">Imprint</a>
          </div>
        </div>
      </div>
    </div>
  );
} 