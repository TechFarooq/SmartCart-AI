import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Zap, 
  Shield, 
  Smartphone, 
  Brain,
  ArrowRight,
  Star,
  Users,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SmartCart</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/shop" className="text-sm hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="/cart" className="text-sm hover:text-primary transition-colors">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            AI-Powered Shopping Experience
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6">
            SmartCart
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of retail with AI-powered frictionless checkout. 
            Shop seamlessly with facial recognition, voice commands, and instant payments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link href="/shop">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Revolutionary Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how SmartCart transforms your shopping experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">AI-Powered Cart</h3>
                <p className="text-sm text-gray-600">
                  Intelligent product recommendations and automated cart building
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Facial Recognition</h3>
                <p className="text-sm text-gray-600">
                  Secure biometric authentication for instant checkout
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Smartphone className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Voice & NFC</h3>
                <p className="text-sm text-gray-600">
                  Pay with voice commands or contactless technology
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Instant Sync</h3>
                <p className="text-sm text-gray-600">
                  Real-time cart synchronization across all devices
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <Star className="w-12 h-12 mx-auto mb-4 opacity-80" />
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of customers who have revolutionized their shopping experience with SmartCart
          </p>
          
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Link href="/shop">
              Start Shopping Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-gray-50">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; 2025 SmartCart. All rights reserved. AI-Powered Retail Solutions.</p>
        </div>
      </footer>
    </div>
  );
}