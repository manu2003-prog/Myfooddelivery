
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For showing discounts (e.g. 50% off)
  isVeg: boolean;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  menu: MenuItem[];
  address: string;
  hasOffer?: boolean; // To control badge visibility
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
  restaurantName: string;
  cookingRequest?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  restaurantName: string;
  restaurantId: string;
  restaurantImage: string;
  date: string;
  scheduledTime?: string;
}

export interface AppState {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}
