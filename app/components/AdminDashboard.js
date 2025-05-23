'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaUtensils, FaShoppingCart, FaSignOutAlt, FaPlus, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', price: '', image: '', category: 'main-meals' });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Item Added Successfully!');
  const router = useRouter();

  // Fixed menu items
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
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/fetchorder');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load orders. Please try again.');
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/order/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      
      // Update the local state to reflect the change immediately
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      ));
    } catch (err) {
      console.error(err);
      setError('Failed to update order status. Please try again.');
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email?.toLowerCase() !== 'admin@cstcanteen.com') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [menuResponse, ordersResponse] = await Promise.all([
          fetch('/api/menu'),
          fetch('/api/fetchorder'),
        ]);

        if (!menuResponse.ok || !ordersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const menuData = await menuResponse.json();
        const ordersData = await ordersResponse.json();
        
        // Combine fixed items with dynamic items from the database
        // Ensure we have about 20 items total by limiting additional items
        const additionalItems = menuData.slice(0, 8); // Limit to 8 additional items
        setMenuItems([...fixedMenuItems, ...additionalItems]);
        
        setOrders(ordersData.map(order => ({
          ...order,
          status: order.status || 'Pending'
        })));
        setError('');
      } catch (err) {
        setError('Failed to load data. Please try again.');
        // If fetch fails, still show fixed items
        setMenuItems(fixedMenuItems);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const validateItem = (item) => {
    if (!item.title.trim()) return 'Title is required';
    if (!item.description.trim()) return 'Description is required';
    if (!item.image.trim()) return 'Image URL is required';
    if (!['main-meals', 'quick-bites', 'beverages'].includes(item.category)) return 'Invalid category';
    const cleanedPrice = item.price.replace(/[^0-9.]/g, '');
    if (!cleanedPrice || isNaN(parseFloat(cleanedPrice))) return 'Valid price is required';
    return null;
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const validationError = validateItem(newItem);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const cleanedItem = {
        ...newItem,
        price: newItem.price.replace(/[^0-9.]/g, ''),
      };

      const response = await fetch('/api/addmenu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedItem),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to add item');
      }

      const addedItem = await response.json();
      setMenuItems([...menuItems, addedItem]);
      setNewItem({ title: '', description: '', price: '', image: '', category: 'main-meals' });
      setError('');
      
      // Show success message
      setSuccessMessage('Item Added Successfully!');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add item. Please try again.');
    }
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    // Don't allow editing of fixed items
    if (String(editingItem.id).startsWith('fixed-')) {
      setError('Cannot edit fixed menu items');
      setEditingItem(null);
      return;
    }

    const validationError = validateItem(editingItem);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const cleanedItem = {
        ...editingItem,
        price: editingItem.price.replace(/[^0-9.]/g, ''),
      };

      const response = await fetch(`/api/menu/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update item');
      }

      const updatedItem = await response.json();
      setMenuItems(menuItems.map(item => 
        item.id === updatedItem.id ? {
          ...updatedItem,
          price: `Nu. ${parseFloat(updatedItem.price).toFixed(2)}`,
        } : item
      ));
      setEditingItem(null);
      setError('');
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Edit error:', err);
      setError(err.message || 'Failed to update item. Please try again.');
    }
  };

  const handleDeleteItem = async (id) => {
    // Don't allow deletion of fixed items
    if (String(id).startsWith('fixed-')) {
      setError('Cannot delete fixed menu items');
      return;
    }

    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete item');
      }

      // Remove the item from the local state
      setMenuItems(menuItems.filter(item => item.id !== id));
      setError('');
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete item. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | CST Canteen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <div className="flex min-h-screen bg-gray-100">
        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <FaCheck className="text-xl" />
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <div className="w-64 bg-blue-800 text-white flex flex-col">
          <div className="p-4 flex items-center gap-2">
            <img
              src="https://st4.depositphotos.com/16061158/39264/v/450/depositphotos_392644810-stock-illustration-food-vector-icon-food-editable.jpg"
              alt="CST Canteen Logo"
              className="h-10 w-10"
            />
            <h2 className="text-xl font-bold text-white">CST Canteen Admin</h2>
          </div>
          <nav className="flex-1">
            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-2 p-4 hover:bg-blue-700 ${activeTab === 'menu' ? 'bg-blue-700' : ''}`}
            >
              <FaUtensils /> Menu Items
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-2 p-4 hover:bg-blue-700 ${activeTab === 'orders' ? 'bg-blue-700' : ''}`}
            >
              <FaShoppingCart /> Orders
            </button>
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-4 hover:bg-blue-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="flex-1 p-8">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
              <button onClick={() => setError('')} className="ml-4 underline">Dismiss</button>
            </div>
          )}

          {activeTab === 'menu' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Menu Items</h2>
              <form onSubmit={handleAddItem} className="mb-8 bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Price (e.g., Nu. 100)"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="border p-2 rounded"
                    required
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="border p-2 rounded"
                  >
                    <option value="main-meals">Main Meals</option>
                    <option value="quick-bites">Quick Bites</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  <FaPlus className="inline mr-2" /> Add Item
                </button>
              </form>

              {editingItem && (
                <form onSubmit={handleEditItem} className="mb-8 bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Edit Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Price (e.g., Nu. 100)"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingItem.image}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      className="border p-2 rounded"
                      required
                    />
                    <select
                      value={editingItem.category}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="border p-2 rounded"
                    >
                      <option value="main-meals">Main Meals</option>
                      <option value="quick-bites">Quick Bites</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                      <FaEdit className="inline mr-2" /> Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">All Menu Items</h3>
                  <p className="text-sm text-gray-500">Total Items: {menuItems.length}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {menuItems.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">{item.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{item.price}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${item.category === 'main-meals' ? 'bg-blue-100 text-blue-800' : 
                                item.category === 'quick-bites' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'}`}>
                              {item.category ? item.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Uncategorized'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => {
                                  setEditingItem(item);
                                }}
                                className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                title="Edit Item"
                              >
                                <FaEdit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                title="Delete Item"
                              >
                                <FaTrash className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {menuItems.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                            No menu items found. Add your first item using the form above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-4 text-left">Order ID</th>
                      <th className="p-4 text-left">Customer</th>
                      <th className="p-4 text-left">Items</th>
                      <th className="p-4 text-left">Total</th>
                      <th className="p-4 text-left">Pickup Time</th>
                      <th className="p-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-t">
                        <td className="p-4">{order.id}</td>
                        <td className="p-4">
                          {order.name} <br />
                          {order.email}
                        </td>
                        <td className="p-4">
                          {order.items.map(item => item.title).join(', ')}
                        </td>
                        <td className="p-4">{order.total}</td>
                        <td className="p-4">
                          {order.pickupTime ? (() => {
                            const [hours, minutes] = order.pickupTime.split(':');
                            const date = new Date();
                            date.setHours(parseInt(hours, 10));
                            date.setMinutes(parseInt(minutes, 10));
                            return date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            });
                          })() : 'Not specified'}
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status || 'Pending'}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            className={`border p-2 rounded w-full ${
                              order.status === 'Completed' 
                                ? 'bg-green-100 text-green-800 border-green-300' 
                                : order.status === 'Prepared'
                                ? 'bg-blue-100 text-blue-800 border-blue-300'
                                : 'bg-red-100 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Prepared">Prepared</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;