'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle, Gift } from 'lucide-react';
import { WalletOption } from '@/types';
import { toast } from 'sonner';

interface DigitalWalletProps {
  total: number;
  onSuccess: () => void;
}

const walletOptions: WalletOption[] = [
  { id: 'google-pay', name: 'Google Pay', icon: '💳', discount: 5 },
  { id: 'apple-pay', name: 'Apple Pay', icon: '🍎', discount: 3 },
  { id: 'paytm', name: 'Paytm', icon: '💰', discount: 7 },
];

export function DigitalWallet({ total, onSuccess }: DigitalWalletProps) {
  const [selectedWallet, setSelectedWallet] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const selectedWalletOption = walletOptions.find(w => w.id === selectedWallet);
  const discount = selectedWalletOption?.discount || 0;
  const loyaltyBonus = total > 500 ? 50 : total > 200 ? 20 : 0;
  const finalTotal = total - (total * discount / 100) - loyaltyBonus;

  const handlePayment = () => {
    if (!selectedWallet) {
      toast.error('Please select a wallet option');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success(`Payment successful via ${selectedWalletOption?.name}!`);
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  if (isComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Payment Successful!
          </h3>
          <p className="text-green-600">
            Paid via {selectedWalletOption?.name}
          </p>
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm">
              <strong>Final Amount: ${finalTotal.toFixed(2)}</strong>
            </p>
            {discount > 0 && (
              <p className="text-xs text-green-600">
                Wallet discount: {discount}% off
              </p>
            )}
            {loyaltyBonus > 0 && (
              <p className="text-xs text-blue-600">
                Loyalty bonus: -${loyaltyBonus}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Digital Wallet Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Wallet</label>
          <Select value={selectedWallet} onValueChange={setSelectedWallet}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your wallet" />
            </SelectTrigger>
            <SelectContent>
              {walletOptions.map((wallet) => (
                <SelectItem key={wallet.id} value={wallet.id}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{wallet.icon}</span>
                    <span>{wallet.name}</span>
                    {wallet.discount && (
                      <Badge variant="secondary" className="ml-auto">
                        {wallet.discount}% off
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedWalletOption && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm">Subtotal:</span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">Wallet discount ({discount}%):</span>
                <span className="font-medium">-${(total * discount / 100).toFixed(2)}</span>
              </div>
            )}
            
            {loyaltyBonus > 0 && (
              <div className="flex justify-between items-center text-blue-600">
                <span className="text-sm flex items-center gap-1">
                  <Gift className="w-4 h-4" />
                  Loyalty bonus:
                </span>
                <span className="font-medium">-${loyaltyBonus}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button 
          onClick={handlePayment}
          disabled={!selectedWallet || isProcessing}
          className="w-full"
          size="lg"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Pay with {selectedWalletOption?.name || 'Wallet'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}