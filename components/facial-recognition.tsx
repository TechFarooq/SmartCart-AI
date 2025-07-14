'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Camera, CheckCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface FacialRecognitionProps {
  onSuccess: () => void;
}

export function FacialRecognition({ onSuccess }: FacialRecognitionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    
    // Simulate facial recognition processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success('Facial recognition successful!');
      
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
            Identity verified successfully
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Facial Recognition Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Upload a photo for secure biometric verification
        </p>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm font-medium">Processing facial recognition...</p>
              <p className="text-xs text-muted-foreground">
                Analyzing biometric data securely
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto" />
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="facial-upload"
                />
                <label htmlFor="facial-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Upload Photo</span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">
                Supports JPG, PNG, WebP (Max 5MB)
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}