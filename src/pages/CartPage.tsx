import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus, Tag, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  restaurantName: string;
}

const initialCartItems: CartItem[] = [
  { id: 'p1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=200', restaurantName: 'Pizza Paradise' },
  { id: 'b1', name: 'Classic Cheeseburger', price: 9.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=200', restaurantName: 'Burger Bliss' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CartPage loaded');
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fee
  const taxes = subtotal * 0.1; // Example 10% tax
  const total = subtotal + deliveryFee + taxes;
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={cartItemCount} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Label className="text-3xl font-bold text-gray-800">Your Cart</Label>
          {cartItems.length > 0 && <p className="text-gray-600">{cartItemCount} items from {new Set(cartItems.map(i => i.restaurantName)).size} restaurant(s)</p>}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <Card key={item.id} className="flex flex-col sm:flex-row items-center p-4 shadow">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-0 mb-4 sm:mr-4 sm:mb-0" />
                  )}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    <p className="text-md font-bold text-orange-600">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2 my-3 sm:my-0">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={item.quantity} readOnly className="w-12 text-center" />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <div className="sm:ml-4">
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (10%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Separator />
                   <div className="flex items-center space-x-2 pt-2">
                    <Tag className="h-5 w-5 text-gray-500" />
                    <Input
                        type="text"
                        placeholder="Promo Code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-grow"
                    />
                    <Button variant="outline" size="sm">Apply</Button>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={() => navigate('/checkout')}>
                    Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;