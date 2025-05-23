'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [notification, setNotification] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartVisible, setCartVisible] = useState(false);

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setNotification({ message: 'Thank you for your message! We will get back to you soon.', type: 'success' });
            setTimeout(() => setNotification(null), 2000);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting the form:', error);
            setNotification({ message: 'There was an error submitting your message. Please try again later.', type: 'error' });
            setTimeout(() => setNotification(null), 2000);
        }
    };

    const removeFromCart = (itemId) => {
        const newCart = cart.filter((item) => item.id !== itemId);
        const newOrderItems = newCart.map((item) => ({
            title: item.name,
            price: `Nu. ${item.price}`,
            image: item.image,
            description: item.description,
        }));
        setCart(newCart);
        localStorage.setItem('orderItems', JSON.stringify(newOrderItems));
    };

    return (
        <>
            <Head>
                <title>Contact Us - College Cafe</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
                <link rel="stylesheet" href="/style.css" />
                <script src="https://cdn.tailwindcss.com"></script>
            </Head>

            <nav className="navbar">
                <div className="logo">
                    <img
                        src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg"
                        alt="Coffee Shop Logo"
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
                    <form action="http://www.google.com/search/" method="get">
                        <input type="search" id="searchBar" placeholder="Search Here" name="q" />
                        <button id="search-icon" type="submit"><i className="fas fa-search"></i></button>
                    </form>
                </div>
                <div className="cart-toggle mr-2" onClick={() => setCartVisible(true)}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count">{cart.length}</span>
                </div>
                <div className="menu-icon" id="menu-icon">
                    <i className="fas fa-bars"></i>
                </div>
            </nav>

            <section className="contact-section">
                <h2 className="section-title">Contact Us</h2>

                {notification && (
                    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded shadow-lg text-white animate-fade-in-out ${
                        notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                        {notification.message}
                    </div>
                )}

                <div className="contact-container">
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>

                    <div className="map-container">
                        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1678.285029447212!2d89.3932501022166!3d26.850899625812453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e3cb2e9c6c4305%3A0x232771847ef5a5d1!2z4L2i4L6Q4L2E4LyL4L2i4L6p4L264L2R4LyL4L2Q4L2E4LyL4LyNIENTVCBGb290YmFsbCBHcm91bmQ!5e1!3m2!1sen!2sus!4v1747552362802!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                <div className="social-links">
                    <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/laxman.bro.319" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.tiktok.com/@laxumanghalley?_t=ZS-8ul8D78d3Lz&_r=1" className="social-icon"><i className="fab fa-tiktok"></i></a>
                </div>
            </section>

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
                            {cart.map((item) => (
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
                            <div className="total-amount">Total: Nu.<span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</span></div>
                            <a href="/menu" className="checkout-btn">Checkout Now</a>
                        </div>
                    </div>
                    <div className="overlay" onClick={() => setCartVisible(false)}></div>
                </>
            )}

            <div className="overlay" id="overlay"></div>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-column">
                            <h3>Products</h3>
                            <ul>
                                <li><a href="#">Shoes</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Category</h3>
                            <ul>
                                <li><a href="#">Men</a></li>
                                <li><a href="#">New In</a></li>
                                <li><a href="#">Weekly Pick</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Company Info</h3>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Payment Options</a></li>
                                <li><a href="#">Track Order</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">Vouchers</a></li>
                                <li><a href="#">Size Charts</a></li>
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
            </footer>

            <div className="mobile-menu" id="mobile-menu">
                <div className="mobile-menu-close" id="mobile-menu-close">
                    <i className="fas fa-times"></i>
                </div>
                <ul className="mobile-nav-links">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/menu">Menu</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/faq">FAQ</Link></li>
                </ul>
            </div>
        </>
    );
}