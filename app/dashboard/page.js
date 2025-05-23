'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {

    ////
    const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Welcome to CST Canteen",
      description: "Order your favorite meals with just a few clicks",
      subDescription: "Fast, convenient, and delicious",
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

    ///
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    profileImage: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user login state and username
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      // Initialize profile data
      if (storedProfile) {
        setProfileData(JSON.parse(storedProfile));
      } else {
        setProfileData(prev => ({
          ...prev,
          name: storedUsername,
          email: storedEmail || ''
        }));
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Save profile data to localStorage
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      setIsEditing(false);
      setShowProfile(false);
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('userProfile');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="navbar bg-gray-800 text-white flex items-center justify-between px-6 py-4 relative z-50">
        <div className="logo flex items-center space-x-2">
          <img
            src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg"
            alt="Canteen Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="font-bold text-lg">CST Canteen</span>
        </div>

        <ul className="nav-links flex space-x-6">
          <li>
            <Link href="/dashboard" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/menu" className="hover:text-blue-400 transition">
              Menu
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/faq" className="hover:text-blue-400 transition">
              FAQ
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative group">
              <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 hover:opacity-80 transition"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  {profileData.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <i className="fas fa-user text-white text-xl"></i>
                    </div>
                  )}
                </div>
                <span className="text-white">{username}</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {profileData.profileImage ? (
                      <img
                        src={profileData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-user text-4xl text-gray-400"></i>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="mt-1">{profileData.department || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1">{profileData.phone || 'Not set'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <p className="mt-1">{profileData.bio || 'No bio added yet'}</p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <input
                      type="text"
                      value={profileData.department}
                      onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {imagePreview || profileData.profileImage ? (
                        <img
                          src={imagePreview || profileData.profileImage}
                          alt="Profile Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <i className="fas fa-user text-2xl text-gray-400"></i>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="profile-image-upload"
                      />
                      <label
                        htmlFor="profile-image-upload"
                        className="cursor-pointer bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
                      >
                        Choose Image
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows="3"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Auto-sliding Hero Section */}
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
                  className="btn inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
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
    </div>
  );
}