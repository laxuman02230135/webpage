'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [faqItems, setFaqItems] = useState([
    {
      question: 'What are the operating hours of CST Canteen?',
      answer: 'CST Canteen is open <span class="highlight">Monday through Friday from 7:30 AM to 9:00 PM</span> and <span class="highlight">Saturday from 9:00 AM to 6:00 PM</span>. We\'re closed on Sundays and major holidays.<br>During finals week, we extend our hours until 11:00 PM on weekdays to support your late-night study sessions!',
      category: 'hours',
      open: false,
    },
    {
      question: 'What food and drink options are available?',
      answer: 'We offer a wide variety of options including:<ul><li>Specialty coffee drinks (espresso, lattes, cold brew)</li><li>Fresh smoothies and juices</li><li>Breakfast items (bagels, pastries, breakfast sandwiches)</li><li>Lunch options (sandwiches, wraps, salads, soups)</li><li>Grab-and-go snacks</li><li>Vegetarian, vegan, and gluten-free options</li></ul>Our menu rotates seasonally and we feature weekly specials created by culinary students!',
      category: 'menu',
      open: false,
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept multiple payment methods for your convenience:<ul><li>Cash</li><li>All major credit/debit cards</li><li>Mobile payments (mBob, mPay, etc)</li><li>The CST Canteen app</li></ul>Load money onto your app for a <span class="highlight">5% discount</span> on all purchases!',
      category: 'payment',
      open: false,
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Yes! We understand the importance of catering to various dietary needs. We offer:<ul><li>Vegetarian and vegan options</li><li>Gluten-free items</li><li>Dairy-free alternatives for all drinks</li><li>Nut-free preparation areas</li><li>Detailed allergen information available upon request</li></ul>Please inform our staff about any allergies or dietary restrictions so we can best accommodate your needs.',
      category: 'menu',
      open: false,
    },
    {
      question: 'Can I host events or study groups at CST Canteen?',
      answer: 'Absolutely! CST Canteen offers spaces for group activities:<ul><li>Small groups (4-8 people) can use our open seating area</li><li>Larger groups can reserve our <span class="highlight">meeting room</span> (capacity: 20 people)</li><li>Student clubs receive priority booking for official meetings</li><li>Special catering options available for events</li></ul>To reserve space, please fill out the form on our website or speak with a manager at least 48 hours in advance.',
      category: 'events',
      open: false,
    },
    {
      question: 'Is there free Wi-Fi available?',
      answer: 'Yes! CST Canteen provides complimentary high-speed Wi-Fi for all customers. Simply connect to the <span class="highlight">"CST-Canteen-Guest"</span> network and accept the terms of service to get online.<br>Students and faculty can also access the secure campus network "CST-Secure" using their university credentials for enhanced security.',
      category: 'other',
      open: false,
    },
    {
      question: 'Are there student employment opportunities?',
      answer: 'Yes! CST Canteen is largely staffed by students. We offer:<ul><li>Flexible work schedules that accommodate class times</li><li>Competitive campus wages starting at Nu.215/hour</li><li>Free meals during shifts</li><li>Valuable work experience</li><li>Management opportunities for long-term employees</li></ul>Applications are accepted year-round, with peak hiring periods at the beginning of each semester. Apply through the campus employment portal or in person at the canteen.',
      category: 'other',
      open: false,
    },
    {
      question: 'Do you host special events or promotions?',
      answer: 'We love creating special experiences for our campus community! Regular events include:<ul><li><span class="highlight">Open Mic Nights</span> - Every other Thursday from 7-9 PM</li><li><span class="highlight">Finals Week Fuel</span> - Extended hours and special discounts</li><li><span class="highlight">Themed Food Weeks</span> - Cultural cuisines featured monthly</li><li><span class="highlight">Coffee Tastings</span> - Learn about different roasts and brewing methods</li><li><span class="highlight">Student Art Showcase</span> - We display student artwork on our walls</li></ul>Follow us on social media or check our events board for upcoming special events.',
      category: 'events',
      open: false,
    },
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleFAQ = (index) => {
    setFaqItems(
      faqItems.map((item, i) =>
        i === index ? { ...item, open: !item.open } : { ...item, open: false }
      )
    );
  };

  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  const filteredFaqs = faqItems.filter(
    (faq) =>
      (activeTag === 'all' || faq.category === activeTag) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CST Canteen - FAQ</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <style jsx>{`
        /* Existing styles unchanged */
      `}</style>
      <nav className="navbar">
        <div className="logo">
          <img
            src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg"
            alt="Canteen logo image"
          />
        </div>
        <ul className="nav-links">
          <li>
            <Link href="/" className="hover:text-orange-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-orange-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/menu" className="hover:text-orange-400">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-400">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-orange-400">
              FAQ
            </Link>
          </li>
        </ul>
        <div className="nav-icons">
          <input
            type="search"
            placeholder="Search Here"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="cart-toggle" onClick={() => setCartVisible(true)}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cart.length}</span>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
      <div className="overlay" style={{ display: menuOpen ? 'block' : 'none' }} onClick={toggleMenu}></div>
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
      <div className="faq-container">
        <div className="faq-header text-center">
          <h1 className="text-4xl font-bold">Frequent Asked Questions</h1>
          <p className="text-gray-600 mt-2">Find answers to the most common questions about our canteen</p>
        </div>
        <div className="faq-search">
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <button className="bg-gray-200 p-2 rounded">🔍</button>
        </div>
        <div className="tags">
          {['all', 'hours', 'menu', 'payment', 'events', 'other'].map((tag) => (
            <span
              key={tag}
              className={`tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          ))}
        </div>
        <div className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className={`faq-item ${faq.open ? 'open' : ''}`} data-category={faq.category}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
              </div>
              <div
                className={`faq-answer ${faq.open ? 'open' : ''}`}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></div>
            </div>
          ))}
        </div>
        <div className="contact-info">
          <h3 className="text-xl font-semibold">Still have questions?</h3>
          <p className="mt-4">
            Contact us at <a href="mailto:info@cstcanteen.edu">info@cstcanteen.edu</a> or call +975 17376910
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/laxman.bro.319" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.tiktok.com/@laxumanghalley?_t=ZS-8ul8D78d3Lz&_r=1" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>Products</h3>
              <ul>
                <li><Link href="#">Food</Link></li>
                <li><Link href="#">Beverages</Link></li>
                <li><Link href="#">Snacks</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Category</h3>
              <ul>
                <li><Link href="#">Daily Specials</Link></li>
                <li><Link href="#">New Items</Link></li>
                <li><Link href="#">Weekly Picks</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Canteen Info</h3>
              <ul>
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">Payment Options</Link></li>
                <li><Link href="#">Track Order</Link></li>
                <li><Link href="#">Support</Link></li>
                <li><Link href="#">Vouchers</Link></li>
                <li><Link href="#">Nutrition Info</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Follow us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <Link href="#">Data settings</Link>
            <Link href="#">Cookie settings</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms And Conditions</Link>
            <Link href="#">Imprint</Link>
          </div>
        </div>
      </div>
    </div>
  );
}