'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface VoicePaymentProps {
  onSuccess: () => void;
}

export function VoicePayment({ onSuccess }: VoicePaymentProps) {
  const [isListening, setIsListening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleVoiceConfirm = () => {
    setIsListening(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      setIsComplete(true);
      toast.success('Voice confirmation successful!');
      
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 3000);
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
            Voice confirmation verified
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          Voice Approval Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Confirm your payment using voice recognition
        </p>
        
        <div className="border rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50">
          {isListening ? (
            <div className="space-y-4">
              <div className="relative">
                <div className="animate-pulse">
                  <Mic className="w-16 h-16 text-red-500 mx-auto" />
                </div>
                <div className="absolute inset-0 animate-ping">
                  <div className="w-20 h-20 border-4 border-red-200 rounded-full mx-auto"></div>
                </div>
              </div>
              <p className="text-sm font-medium">Listening for confirmation...</p>
              <p className="text-xs text-muted-foreground">
                Say "Confirm payment" to authorize
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Mic className="w-16 h-16 text-gray-400 mx-auto" />
              <Button onClick={handleVoiceConfirm} className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Mic className="w-4 h-4 mr-2" />
                Start Voice Confirmation
              </Button>
              <p className="text-xs text-muted-foreground">
                Click to begin voice authorization
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}