'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product, CartItem } from '@/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product: Product) => {
        const items = get().items;
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          get().updateQuantity(product.id, existingItem.quantity + 1);
        } else {
          const newItems = [...items, { product, quantity: 1 }];
          set({ items: newItems });
          get().calculateTotal();
        }
      },
      
      removeItem: (productId: string) => {
        const newItems = get().items.filter(item => item.product.id !== productId);
        set({ items: newItems });
        get().calculateTotal();
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        const newItems = get().items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
        get().calculateTotal();
      },
      
      clearCart: () => {
        set({ items: [], total: 0 });
      },
      
      calculateTotal: () => {
        const total = get().items.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        );
        set({ total });
      },
    }),
    {
      name: 'smartcart-storage',
    }
  )
);