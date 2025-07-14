'use client';

import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/lib/store';

interface CartItemProps {
  item: CartItem;
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {item.product.description}
            </p>
            <p className="text-lg font-bold text-primary">
              ${item.product.price.toFixed(2)}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.product.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center gap-2 border rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <span className="px-3 py-1 min-w-[3rem] text-center">
                {item.quantity}
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="font-semibold text-lg">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}