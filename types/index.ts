export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  type: 'facial' | 'voice' | 'nfc' | 'wallet';
}

export interface WalletOption {
  id: string;
  name: string;
  icon: string;
  discount?: number;
}