import { loadStripe } from "@stripe/stripe-js";
import React from 'react';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const Shop: React.FC = () => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // Call your backend to create a checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{ id: 1, quantity: 1 }] }),
    });

    const session = await response.json();

    // Redirect to Stripe checkout
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h2 className="text-lg font-semibold">Product Name</h2>
          <p className="text-gray-600">$99.99</p>
          <button
            onClick={handleCheckout}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
