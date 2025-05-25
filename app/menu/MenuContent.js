'use client';

import { useApp } from '../context/AppContext';

export default function MenuContent() {
  const { cart, setCart } = useApp();

  const menuItems = [
    {
      id: 1,
      name: 'Burger',
      price: 5.99,
      description: 'Juicy beef patty with fresh vegetables',
      image: '/images/burger.jpg'
    },
    {
      id: 2,
      name: 'Pizza',
      price: 8.99,
      description: 'Classic margherita pizza',
      image: '/images/pizza.jpg'
    },
    // Add more menu items as needed
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 