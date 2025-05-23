'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  const [cart, setCart] = useState([]);
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
  }, [cartVisible]);

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

  const removeFromCart = (itemId) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem('orderItems', JSON.stringify(newCart));
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
    <>
      <Head>
        <title>About CST Canteen - Easy Food Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="stylesheet" href="/style.css" />
      </Head>

      <nav className="navbar">
        <div className="logo">
          <img
            src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg"
            alt="Canteen Logo"
          />
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
        </ul>
        <div className="nav-icons">
          <form action="https://www.google.com/search" method="GET" id="nav-form">
            <input type="text" placeholder="Search Here" name="q" />
            <button type="submit"><i className="fas fa-search"></i></button>
          </form>
        </div>
        <div className="menu-icon" id="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      <header>
        <div className="container">
          <h1 className="page-title">About CST Canteen</h1>
          <p className="subtitle">Nourishing Minds and Bodies Across Campus</p>
        </div>
      </header>

      <section className="our-story">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-container">
            <div className="story-image">
              <img src="/Images/cstCanteen.png" alt="CST Canteen Interior" />
            </div>
            <br /><br />
            <div className="story-content">
              <h3>Serving the CST Community</h3>
              <p>The CST Canteen was established in 2015 with a simple mission: to provide nutritious, delicious, and affordable meals to students and faculty in a welcoming environment that promotes community bonding and academic success.</p>
              <p>What began as a basic food service has evolved into a comprehensive dining experience. Recognizing the challenges students faced with long lines and limited time between classes, we launched our Easy Food System in 2023 - revolutionizing the campus dining experience through technology.</p>
              <p>Today, our digital ordering system allows the entire campus community to browse menus, place orders, and make payments online, with their meals ready for pickup at their convenience. We've transformed from just a place to eat into an essential part of campus life and academic efficiency.</p>
            </div>
          </div>

          <div className="milestone-grid">
            <div className="milestone"><div className="year">2015</div><div className="event">CST Canteen Opens Its Doors</div></div>
            <div className="milestone"><div className="year">2018</div><div className="event">Menu Expansion to Include Local Cuisine</div></div>
            <div className="milestone"><div className="year">2021</div><div className="event">Nutritional Program Implementation</div></div>
            <div className="milestone"><div className="year">2023</div><div className="event">Easy Food System Launch</div></div>
          </div>
        </div>
      </section>

      <section className="our-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-container">
            <div className="value-card"><div className="value-icon"><i className="fas fa-utensils"></i></div><h3>Quality</h3><p>We source fresh ingredients...</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-seedling"></i></div><h3>Sustainability</h3><p>We're committed to eco-friendly practices...</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-users"></i></div><h3>Community</h3><p>We create a welcoming dining environment...</p></div>
            <div className="value-card"><div className="value-icon"><i className="fas fa-mobile-alt"></i></div><h3>Innovation</h3><p>Our Easy Food System represents...</p></div>
          </div>
        </div>
      </section>

      <section className="our-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-container">
            <div className="team-member">
              <div className="member-image"><img src="/Images/photo_2025-03-18_23-47-43.jpg" alt="Tashi Gyeltshen" /></div>
              <div className="member-info">
                <h3 className="member-name">Tashi Gyeltshen</h3>
                <p className="member-position">Canteen Manager</p>
                <p>Tashi brings 10 years of food service experience and a passion for creating nutritious meal options for students.</p>
                <div className="social-icons"><a href="#"><i className="fab fa-linkedin-in"></i></a><a href="#"><i className="fab fa-instagram"></i></a></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image"><img src="/Images/photo_2025-03-18_23-47-56.jpg" alt="Chimi Gyeltshen" /></div>
              <div className="member-info">
                <h3 className="member-name">Chimi Gyeltshen</h3>
                <p className="member-position">Head Chef</p>
                <p>Chimi is a culinary expert specializing in both international cuisine and traditional Bhutanese dishes</p>
                <div className="social-icons"><a href="#"><i className="fab fa-linkedin-in"></i></a><a href="#"><i className="fab fa-instagram"></i></a></div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image"><img src="/Images/photo_2025-03-18_23-47-32.jpg" alt="Sonam Choejur" /></div>
              <div className="member-info">
                <h3 className="member-name">Sonam Choejur</h3>
                <p className="member-position">Nutritionist</p>
                <p>Sonam ensures all our meals are balanced and nutritious, helping students maintain healthy eating habits.</p>
                <div className="social-icons"><a href="#"><i className="fab fa-linkedin-in"></i></a><a href="#"><i className="fab fa-instagram"></i></a></div>
              </div>
            </div>
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
    </>
  );
}