'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FacialRecognition } from '@/components/facial-recognition';
import { VoicePayment } from '@/components/voice-payment';
import { NfcPayment } from '@/components/nfc-payment';
import { DigitalWallet } from '@/components/digital-wallet';
import { useCartStore } from '@/lib/store';
import { 
  ArrowLeft, 
  CheckCircle, 
  Package, 
  Gift,
  CreditCard,
  Sparkles
} from 'lucide-react';

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<'payment' | 'success'>('payment');
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const loyaltyBonus = total > 500 ? 50 : total > 200 ? 20 : 0;
  const finalTotal = total + (total * 0.08) - loyaltyBonus;

  const handlePaymentSuccess = () => {
    setCurrentStep('success');
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
    }, 3000);
  };

  if (items.length === 0 && currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No items to checkout</h2>
          <p className="text-gray-500 mb-8">Your cart is empty</p>
          <Button asChild size="lg">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-green-200">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-green-700 mb-2">
              Payment Successful!
            </h1>
            
            <p className="text-green-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            <div className="bg-white p-4 rounded-lg mb-6 border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order Total:</span>
                <span className="font-bold">${finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Items:</span>
                <span className="text-sm">{totalItems}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Secure Checkout</h1>
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choose Payment Method</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select your preferred frictionless payment option
                </p>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedMethod} onValueChange={setSelectedMethod}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="facial">Facial</TabsTrigger>
                    <TabsTrigger value="voice">Voice</TabsTrigger>
                    <TabsTrigger value="nfc">NFC/QR</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    <TabsContent value="wallet">
                      <DigitalWallet 
                        total={finalTotal}
                        onSuccess={handlePaymentSuccess}
                      />
                    </TabsContent>
                    
                    <TabsContent value="facial">
                      <FacialRecognition onSuccess={handlePaymentSuccess} />
                    </TabsContent>
                    
                    <TabsContent value="voice">
                      <VoicePayment onSuccess={handlePaymentSuccess} />
                    </TabsContent>
                    
                    <TabsContent value="nfc">
                      <NfcPayment onSuccess={handlePaymentSuccess} />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity} × ${item.product.price}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  {items.length > 3 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  
                  {loyaltyBonus > 0 && (
                    <div className="flex justify-between text-sm text-blue-600">
                      <span className="flex items-center gap-1">
                        <Gift className="w-3 h-3" />
                        Loyalty Bonus:
                      </span>
                      <span>-${loyaltyBonus}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-700 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-medium">AI-Powered Security</span>
                  </div>
                  <p className="text-xs text-blue-600">
                    Your payment is protected by advanced AI fraud detection and biometric verification
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}