'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaSearch, FaBars, FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('main-meals');
  const [orderItems, setOrderItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupTime: '',
    specialInstructions: ''
  });
  const [addedItems, setAddedItems] = useState({});
  const [notification, setNotification] = useState(null);
  const [itemNotifications, setItemNotifications] = useState({});
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded menu items
  const fixedMenuItems = [
    // Main Meals
    {
      id: 'fixed-1',
      title: 'Ema Datshi',
      description: 'Traditional Bhutanese chili and cheese stew served with red rice',
      price: 'Nu. 120.00',
      image: 'https://bhutan-kitchen.com/wp-content/uploads/2024/08/Green-Chilli-Ema-Datshi-menu-item.png',
      category: 'main-meals',
      isFixed: true
    },
    {
      id: 'fixed-2',
      title: 'Shakam Datshi',
      description: 'Dried beef cooked with cheese and chili',
      price: 'Nu. 150.00',
      image: 'https://media.sublimetrails.com/uploads/media/blog/bhutan-cuisine/shakam-shukam-datsi.png',
      category: 'main-meals',
      isFixed: true
    },
    {
      id: 'fixed-3',
      title: 'Kewa Datshi',
      description: 'Potato cooked with cheese and chili',
      price: 'Nu. 100.00',
      image: 'https://bhutan-kitchen.com/wp-content/uploads/2024/08/Kewa-Datshi-menu-item-Bhutan-Kitchen-400x.png',
      category: 'main-meals',
      isFixed: true
    },
    {
      id: 'fixed-4',
      title: 'Vegetable Fried Rice',
      description: 'Stir-fried rice with mixed vegetables and egg',
      price: 'Nu. 110.00',
      image: 'https://img.taste.com.au/uMAyK77R/taste/2024/08/quick-mongolian-beef-fried-rice-in-bowl-201667-1.jpg',
      category: 'main-meals',
      isFixed: true
    },
    // Quick Bites
    {
      id: 'fixed-5',
      title: 'Cheese Sandwich',
      description: 'Toasted bread with cheese and vegetables',
      price: 'Nu. 80.00',
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2024/04/HamSandwich-0d4e4ff.jpg',
      category: 'quick-bites',
      isFixed: true
    },
    {
      id: 'fixed-6',
      title: 'Chicken Momo',
      description: 'Steamed dumplings filled with spiced chicken and vegetables',
      price: 'Nu. 90.00',
      image: 'https://img.taste.com.au/mdKxKxoR/taste/2016/11/chicken-momos-with-tomato-achar-46671-1.jpeg',
      category: 'quick-bites',
      isFixed: true
    },
    {
      id: 'fixed-7',
      title: 'Vegetable Spring Roll',
      description: 'Crispy rolls filled with mixed vegetables and noodles',
      price: 'Nu. 70.00',
      image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/04/spring-rolls-with-vegetables.jpg',
      category: 'quick-bites',
      isFixed: true
    },
    {
      id: 'fixed-8',
      title: 'French Fries',
      description: 'Crispy golden fries served with ketchup',
      price: 'Nu. 60.00',
      image: 'https://thecozycook.com/wp-content/uploads/2020/02/Copycat-McDonalds-French-Fries-.jpg',
      category: 'quick-bites',
      isFixed: true
    },
    // Beverages
    {
      id: 'fixed-9',
      title: 'Suja (Butter Tea)',
      description: 'Traditional Bhutanese salted butter tea',
      price: 'Nu. 40.00',
      image: 'https://blessmyfoodbypayal.com/wp-content/uploads/2024/12/IMG_6800.png',
      category: 'beverages',
      isFixed: true
    },
    {
      id: 'fixed-10',
      title: 'Milk Tea',
      description: 'Traditional Bhutanese milk tea',
      price: 'Nu. 40.00',
      image: 'https://raw.githubusercontent.com/hdpngworld/HPW/main/uploads/65223a8acc063-Milk%20Tea%20Cup%20Top%20View.png',
      category: 'beverages',
      isFixed: true
    },
    {
      id: 'fixed-11',
      title: 'Lemonade',
      description: 'Fresh squeezed lemonade with mint',
      price: 'Nu. 50.00',
      image: 'https://lh5.googleusercontent.com/proxy/QoPEGQzZ-HE73ZZGxnWwgKzJW6TL5Xpod2xUY3g9MbrOmWYuyeJ4UVIZq7mqpDTa676wJS7AVzLwshWnJXadVd2xnzlQGvMUjcbvscXpH30',
      category: 'beverages',
      isFixed: true
    },
    {
      id: 'fixed-12',
      title: 'Fresh Juice',
      description: 'Seasonal fresh fruit juice',
      price: 'Nu. 60.00',
      image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/fruit-juice-recipe-1.jpg',
      category: 'beverages',
      isFixed: true
    }
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu-items');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        // Combine fixed items with dynamic items from the database
        setMenuItems([...fixedMenuItems, ...data]);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setNotification({ type: 'error', message: 'Failed to load menu items' });
        // If fetch fails, still show fixed items
        setMenuItems(fixedMenuItems);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const savedOrder = typeof window !== 'undefined' ? localStorage.getItem('orderItems') : null;
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      setOrderItems(parsedOrder);
      calculateTotal(parsedOrder);
      const added = parsedOrder.reduce((acc, item) => ({
        ...acc,
        [item.title]: true
      }), {});
      setAddedItems(added);
    }
  }, []);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const updatedCart = storedItems.map((item, index) => ({
      id: index,
      name: item.title,
      price: parseFloat(String(item.price).replace('Nu. ', '')) || 0,
      image: item.image,
      quantity: 1,
      description: item.description,
    }));
    setCart(updatedCart);
  }, [cartVisible]);

 const calculateTotal = (items) => {
  const sum = items.reduce((acc, item) => {
    const priceStr = String(item.price);
    // Extract only the numeric part after "Nu. " and convert to number
    const price = parseFloat(priceStr.replace('Nu. ', '')) || 0;
    return acc + price;
  }, 0);
  setTotal(sum);
};


  const addToCart = (itemData) => {
    const newOrderItems = [...orderItems, itemData];
    setOrderItems(newOrderItems);
    calculateTotal(newOrderItems);
    
    setAddedItems(prev => ({ ...prev, [itemData.title]: true }));
    
    setItemNotifications(prev => ({
      ...prev,
      [itemData.title]: `${itemData.title} added to cart!`
    }));
    setTimeout(() => {
      setItemNotifications(prev => ({
        ...prev,
        [itemData.title]: null
      }));
    }, 2000);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('orderItems', JSON.stringify(newOrderItems));
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
    setOrderItems(newOrderItems);
    localStorage.setItem('orderItems', JSON.stringify(newOrderItems));
    calculateTotal(newOrderItems);
    setAddedItems((prev) => {
      const updated = { ...prev };
      const removedItem = cart.find((item) => item.id === itemId);
      if (removedItem) delete updated[removedItem.name];
      return updated;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.pickupTime) {
      setNotification({ message: 'Please fill in all required fields.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    if (orderItems.length === 0) {
      setNotification({ message: 'Please add at least one item to your order.', type: 'error' });
      setTimeout(() => setNotification(null), 2000);
      return;
    }

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: orderItems,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit order');
      }

      setNotification({ message: 'Order submitted successfully!', type: 'success' });
      setTimeout(() => setNotification(null), 2000);
      
      setOrderItems([]);
      setTotal(0);
      setFormData({
        name: '',
        email: '',
        phone: '',
        pickupTime: '',
        specialInstructions: ''
      });
      setAddedItems({});
      setItemNotifications({});
      setCart([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('orderItems');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      setNotification({ message: `Failed to submit order: ${error.message}`, type: 'error' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>CST Canteen</title>
        <meta name="description" content="Order ahead and skip the lines" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <nav className="navbar">
        <div className="logo">
          <img src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg" alt="CST Canteen Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/menu">Menu</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
        <div className="nav-icons">
          <form action="http://www.google.com/search/" method="post" id="nav-form">
            <input type="search" id="searchBar" placeholder="Search Here" name="q" />
            <button id="search-icon"><FaSearch /></button>
          </form>
        </div>
        <div className="cart-toggle" onClick={() => setCartVisible(true)}>
          <i className="fas fa-shopping-cart"></i>
          <span className="cart-count">{cart.length}</span>
        </div>
        <div className="menu-icon" id="menu-icon">
          <FaBars />
        </div>
      </nav>
      <br /><br />
      <div className="container">
        <div className="header">
          <h1>CST Canteen</h1>
          <p>Order ahead and skip the lines</p>
        </div>
        
        {notification && (
          <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-lg shadow-2xl text-white text-lg font-semibold animate-notification-pulse z-50 ${
            notification.type === 'success' ? 'bg-green-500 border-2 border-green-300' : 'bg-red-500 border-2 border-red-300'
          }`}>
            {notification.message}
          </div>
        )}
        
        <div className="main-content">
          <div className="menu-categories">
            <button 
              className={`category-button ${activeCategory === 'main-meals' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('main-meals')}
            >
              🍚 Main Meals
            </button>
            <button 
              className={`category-button ${activeCategory === 'quick-bites' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('quick-bites')}
            >
              🥪 Quick Bites
            </button>
            <button 
              className={`category-button ${activeCategory === 'beverages' ? 'active' : ''}`} 
              onClick={() => setActiveCategory('beverages')}
            >
              🥤 Beverages
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4">Loading menu items...</p>
            </div>
          ) : (
            <div className="menu-items active">
              {menuItems
                .filter(item => item.category === activeCategory)
                .map((item) => (
                  <div key={item.id} className="menu-item">
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="price">{item.price}</div>
                    <div className="relative">
                      <button 
                        className={`add-to-cart ${addedItems[item.title] ? 'bg-green-500' : ''}`} 
                        onClick={() => addToCart(item)}
                      >
                        {addedItems[item.title] ? 'Added' : 'Add to Order'}
                      </button>
                      {itemNotifications[item.title] && (
                        <div className="absolute left-0 right-0 mt-2 bg-green-500 text-white text-center text-sm py-1 rounded animate-fade-in-out">
                          {itemNotifications[item.title]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          <div className="order-section">
            <div className="order-form">
              <h2>Place Your Order</h2>
              <form id="orderForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pickup-time">Pickup Time</label>
                  <input 
                    type="time" 
                    id="pickup-time" 
                    name="pickupTime" 
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="special-instructions">Special Instructions</label>
                  <textarea 
                    id="special-instructions" 
                    name="specialInstructions" 
                    rows="3"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                <div className="selected-items" id="selected-items">
                  <h3>Your Order:</h3>
                  <ul id="order-list">
                    {orderItems.map((item, index) => (
                      <li key={index}>
                        {item.title} - {item.price}
                      </li>
                    ))}
                  </ul>
                  <div id="order-total">Total: Nu. {total}</div>
                </div>
                
                <button type="submit" className="submit-btn">Submit Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br /><br />

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
              <div className="total-amount">Total: Nu.<span>{total}</span></div>
              <a href="#" className="checkout-btn">Checkout Now</a>
            </div>
          </div>
          <div className="overlay" onClick={() => setCartVisible(false)}></div>
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
                <a href="#" className="social-icon">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon">
                  <FaFacebookF />
                </a>
                <a href="#" className="social-icon">
                  <FaYoutube />
                </a>
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