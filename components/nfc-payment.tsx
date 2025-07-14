'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, QrCode, CheckCircle, Nfc } from 'lucide-react';
import { toast } from 'sonner';

interface NfcPaymentProps {
  onSuccess: () => void;
}

export function NfcPayment({ onSuccess }: NfcPaymentProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'nfc' | 'qr'>('nfc');

  const handleScanToPay = () => {
    setIsScanning(true);
    
    // Simulate NFC/QR scanning
    setTimeout(() => {
      setIsScanning(false);
      setIsComplete(true);
      toast.success(`${paymentMethod.toUpperCase()} payment successful!`);
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2500);
  };

  if (isComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Payment Authorized!
          </h3>
          <p className="text-green-600">
            {paymentMethod.toUpperCase()} scan completed successfully
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          NFC/QR Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            variant={paymentMethod === 'nfc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('nfc')}
          >
            <Nfc className="w-4 h-4 mr-2" />
            NFC
          </Button>
          <Button
            variant={paymentMethod === 'qr' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPaymentMethod('qr')}
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
        </div>
        
        <div className="border rounded-lg p-8 text-center bg-gradient-to-br from-green-50 to-blue-50">
          {isScanning ? (
            <div className="space-y-4">
              <div className="relative">
                <div className="animate-pulse">
                  {paymentMethod === 'nfc' ? (
                    <Nfc className="w-16 h-16 text-blue-500 mx-auto" />
                  ) : (
                    <QrCode className="w-16 h-16 text-green-500 mx-auto" />
                  )}
                </div>
                <div className="absolute inset-0 animate-ping">
                  <div className="w-20 h-20 border-4 border-blue-200 rounded-full mx-auto"></div>
                </div>
              </div>
              <p className="text-sm font-medium">
                Scanning {paymentMethod.toUpperCase()}...
              </p>
              <p className="text-xs text-muted-foreground">
                Keep your device close to complete payment
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethod === 'nfc' ? (
                <Nfc className="w-16 h-16 text-gray-400 mx-auto" />
              ) : (
                <QrCode className="w-16 h-16 text-gray-400 mx-auto" />
              )}
              <Button 
                onClick={handleScanToPay}
                className="bg-gradient-to-r from-green-500 to-blue-600"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Scan to Pay
              </Button>
              <p className="text-xs text-muted-foreground">
                Tap to simulate {paymentMethod.toUpperCase()} payment
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}