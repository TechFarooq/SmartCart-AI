'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CartItemComponent } from '@/components/cart-item';
import { useCartStore } from '@/lib/store';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Trash2, 
  Gift,
  CreditCard,
  Package
} from 'lucide-react';

export default function Cart() {
  const { items, total, clearCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate loyalty bonus
  const loyaltyBonus = total > 500 ? 50 : total > 200 ? 20 : 0;
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shop">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Shopping Cart</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items to your cart yet
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shop">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">Shopping Cart</h1>
                <Badge variant="secondary">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Cart Items ({totalItems})</h2>
            {items.map((item) => (
              <CartItemComponent key={item.product.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items):</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping:</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  {loyaltyBonus > 0 && (
                    <div className="flex justify-between text-sm text-blue-600">
                      <span className="flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        Loyalty Bonus:
                      </span>
                      <span>-${loyaltyBonus}</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(total + (total * 0.08) - loyaltyBonus).toFixed(2)}</span>
                  </div>
                </div>
                
                {loyaltyBonus > 0 && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <Gift className="w-4 h-4" />
                      <span className="font-medium">Loyalty Reward Applied!</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      You saved ${loyaltyBonus} with your loyalty points
                    </p>
                  </div>
                )}
                
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <div className="text-center">
                  <Link 
                    href="/shop" 
                    className="text-sm text-primary hover:underline"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}