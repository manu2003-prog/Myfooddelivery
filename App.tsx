
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RestaurantCard from './components/RestaurantCard';
import MenuModal from './components/MenuModal';
import CartDrawer from './components/CartDrawer';
import LoginPage from './components/LoginPage';
import CheckoutModal from './components/CheckoutModal';
import UserProfile from './components/UserProfile';
import SupportWidget from './components/SupportWidget';
import { Restaurant, MenuItem, CartItem, Order } from './types';
import { fetchRestaurants } from './services/geminiService';
import { Loader2, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // User State
  const [user, setUser] = useState<{name: string, email: string, phone?: string} | null>(null);
  
  // Persistence for user data
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Navigation State
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');

  // Data State
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Load persistent data on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('venkatagiri_favs');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    
    const savedOrders = localStorage.getItem('venkatagiri_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save persistent data on change
  useEffect(() => {
    localStorage.setItem('venkatagiri_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('venkatagiri_orders', JSON.stringify(orders));
  }, [orders]);

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Error loading restaurants", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddToCart = useCallback((item: MenuItem, restaurant: Restaurant, note?: string) => {
    setCart(prevCart => {
      // Check if item exists with SAME options (e.g. note) from SAME restaurant
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        // Update note if provided
        if (note) newCart[existingItemIndex].cookingRequest = note;
        return newCart;
      } else {
        return [...prevCart, { 
          ...item, 
          quantity: 1, 
          restaurantId: restaurant.id, 
          restaurantName: restaurant.name,
          cookingRequest: note 
        }];
      }
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(0, item.quantity + delta) };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCheckoutOpen(false);
    // Optionally redirect to profile to track
    setCurrentView('profile');
  };

  const handleToggleFavorite = (e: React.MouseEvent, restaurantId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      if (prev.includes(restaurantId)) {
        return prev.filter(id => id !== restaurantId);
      } else {
        return [...prev, restaurantId];
      }
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (cart.length > 0 ? 35 : 0);

  // ---- RENDER LOGIC ----

  if (!user) {
    return <LoginPage onLoginSuccess={setUser} />;
  }

  // PROFILE VIEW
  if (currentView === 'profile') {
    return (
      <UserProfile 
        user={user} 
        orders={orders} 
        favorites={favorites} 
        restaurants={restaurants}
        onLogout={() => setUser(null)}
        onBack={() => setCurrentView('home')}
      />
    );
  }

  // HOME VIEW
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        onProfileClick={() => setCurrentView('profile')}
        user={user}
      />

      <main className="flex-grow">
        <Hero userName={user.name} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Smart Recommendations Section */}
          <div className="mb-12">
             <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
             </div>
             {loading ? (
               <div className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {/* Simulate smart recommendations by picking random restaurants */}
                 {restaurants.slice(0, 4).map(restaurant => (
                   <RestaurantCard 
                     key={`rec-${restaurant.id}`} 
                     restaurant={restaurant} 
                     onClick={setSelectedRestaurant}
                     isFavorite={favorites.includes(restaurant.id)}
                     onToggleFavorite={handleToggleFavorite}
                   />
                 ))}
               </div>
             )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">All Restaurants</h2>
            
            <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-colors shadow-sm">
                Pure Veg
              </button>
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-colors shadow-sm">
                Rating 4.0+
              </button>
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-colors shadow-sm">
                Under 30 Mins
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
              <p className="text-gray-500 text-lg">Finding the best food in Venkatagiri...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map(restaurant => (
                <RestaurantCard 
                  key={restaurant.id} 
                  restaurant={restaurant} 
                  onClick={setSelectedRestaurant}
                  isFavorite={favorites.includes(restaurant.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>About Us</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Help & Support</li>
                <li>Partner with us</li>
                <li>Ride with us</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>Terms & Conditions</li>
                <li>Refund & Cancellation</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <p className="border-t border-gray-200 pt-8 text-center text-base text-gray-400">
            &copy; 2024 Venkatagiri Eats. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Support Widget */}
      <SupportWidget />

      {/* Overlays */}
      <MenuModal 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
        onAddToCart={handleAddToCart}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckoutClick}
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={totalAmount}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default App;
