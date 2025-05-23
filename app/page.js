'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Study Hard. Eat Smart.",
      description: "Skip the queue and save time—order now from the CST Canteen Website!",
      subDescription: "Delicious food, just a click away.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      buttonText: "Order Now",
      buttonLink: "/menu"
    },
    {
      title: "Fresh & Healthy",
      description: "Enjoy our daily specials made with fresh ingredients",
      subDescription: "Quality food for quality education",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      buttonText: "View Menu",
      buttonLink: "/menu"
    },
    {
      title: "Quick & Easy",
      description: "Order online and pick up at your convenience",
      subDescription: "No more waiting in long queues",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      buttonText: "Get Started",
      buttonLink: "/menu"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

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

  const removeFromCart = (itemId) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setCart(newCart);
    localStorage.setItem('orderItems', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Head>
        <title>CST | CANTEEN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
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
        <div className="flex items-center space-x-2 mr-3">
          <Link href="/login">
            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
              Signup
            </button>
          </Link>
        </div>
        <div className="menu-icon mr-10" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
      <div className="overlay" onClick={toggleMenu}></div>
      <section className="hero-container relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            <div className="container mx-auto px-4 relative z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-2xl text-white"
              >
                <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="text-xl mb-2">{slides[currentSlide].description}</p>
                <p className="text-lg mb-8">{slides[currentSlide].subDescription}</p>
                <motion.a
                  href={slides[currentSlide].buttonLink}
                  className="btn inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slides[currentSlide].buttonText}
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </section>
      <section className="categories">
        <h2 className="section-title">POPULAR MEALS</h2>
        <p className="section-subtitle">Most Ordered Dishes This Week</p>
        <div className="category-grid">
          <div className="category-card">
            <img src="https://bhutan-kitchen.com/wp-content/uploads/2024/08/Kewa-Datshi-menu-item-Bhutan-Kitchen-400x.png" alt="Kewa Datsi" />
          </div>
          <div className="category-card">
            <img src="https://br10.in/wp-content/uploads/2024/08/chowmin.png" alt="Chowmein" />
          </div>
          <div className="category-card">
            <img src="https://feastwithsafiya.com/wp-content/uploads/2022/03/chicken-curry-recipe.jpg" alt="Jasha Maru" />
          </div>
        </div>
      </section>
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonial-container">
            {[{
              img: "/Images/photo_2025-03-18_23-47-43.jpg",
              name: "Tashi Gyeltshen",
              dept: "Software Engineering Department",
              text: "The Easy Food System is a game-changer! ..."
            }, {
              img: "/Images/photo_2025-03-18_23-47-56.jpg",
              name: "Chimi Gyeltshen",
              dept: "Information Technology Department",
              text: "As a busy professor, I appreciate ..."
            }, {
              img: "/Images/photo_2025-03-18_23-47-32.jpg",
              name: "Sonam Choejur",
              dept: "Information Technology Department",
              text: "I love that I can customize my orders ..."
            }].map((user, i) => (
              <div className="testimonial" key={i}>
                <p className="testimonial-text">{user.text}</p>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={user.img} alt={user.name} />
                  </div>
                  <div className="author-info">
                    <h4>{user.name}</h4>
                    <p>{user.dept}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cta">
            <a href="#" className="cta-btn">Download App Now</a>
          </div>
        </div>
      </section>
      <div className="cart-toggle" onClick={() => setCartVisible(true)}>
        <i className="fas fa-shopping-cart"></i>
        <span className="cart-count">{cart.length}</span>
      </div>
      {cartVisible && (
        <>
          <div className="cart-overlay active">
            <div className="cart-header">
              <h3>Your Orders</h3>
              <div className="cart-close" onClick={() => setCartVisible(false)}>
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
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div className="total-amount">Total: Nu.<span>{total}</span></div>
              <a href="#" className="checkout-btn">Checkout Now</a>
            </div>
          </div>
          <div className="overlay" onClick={() => setCartVisible(false)}></div>
        </>
      )}
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