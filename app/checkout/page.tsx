"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const [showPopup, setShowPopup] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    clearCart(); // Empty the cart
    setShowPopup(true); // Show popup
  };

  // Auto close popup after 4 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  if (items.length === 0 && !showPopup) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">🛒 Your Cart is Empty</h1>
        <p className="text-gray-600">Add items to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>

      {/* Cart Items */}
      <div className="space-y-4 max-w-xl mx-auto">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  –
                </Button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addItem({ ...item, quantity: 1 })}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2 text-base md:text-lg">
              <span>Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4" onClick={handleOrder}>
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 px-4">
          <Card className="w-full max-w-sm bg-white rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            <CardHeader>
              <CardTitle className="text-green-600 text-center text-lg md:text-xl">
                🎉 Order Placed!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-700">
              <p className="text-sm md:text-base">Your order has been placed successfully.</p>
              <p className="text-xs md:text-sm mt-2">Thank you for shopping with us!</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
