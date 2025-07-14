import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitor',
    rating: 4.6,
    inStock: true,
  },
  {
    id: '3',
    name: 'Organic Coffee Beans',
    price: 24.99,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Food',
    description: 'Premium organic coffee beans, single origin',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '4',
    name: 'Laptop Computer',
    price: 899.99,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'High-performance laptop for work and gaming',
    rating: 4.7,
    inStock: true,
  },
  {
    id: '5',
    name: 'Yoga Mat',
    price: 49.99,
    image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fitness',
    description: 'Non-slip premium yoga mat for all exercises',
    rating: 4.5,
    inStock: true,
  },
  {
    id: '6',
    name: 'Smartphone',
    price: 699.99,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Latest smartphone with advanced camera system',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '7',
    name: 'Running Shoes',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    description: 'Comfortable running shoes with superior cushioning',
    rating: 4.6,
    inStock: true,
  },
  {
    id: '8',
    name: 'Backpack',
    price: 79.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    description: 'Durable travel backpack with multiple compartments',
    rating: 4.4,
    inStock: true,
  },
];

export const getRecommendedProducts = (currentProduct: Product, allProducts: Product[]): Product[] => {
  return allProducts
    .filter(p => p.id !== currentProduct.id)
    .filter(p => p.category === currentProduct.category || Math.abs(p.price - currentProduct.price) < 100)
    .slice(0, 3);
};