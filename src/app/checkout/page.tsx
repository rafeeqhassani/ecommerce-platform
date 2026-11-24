"use client";

import Link from "next/link";
import { useState } from "react";

import { useCart } from "../context/CartContext";

import CheckoutItem from "@/app/components/CheckoutItem";
import ShippingForm from "../components/ShippingForm";
import BillingForm from "../components/BillingForm";
import type { ShippingData } from "@/types/shipping";
import type { BillingData } from "@/types/billing";
import OrderReview from "@/app/components/OrderReview";

import { isCartValid } from "@/lib/cart";

export default function CheckoutPage() {
  const { cart, inventory, isHydrated } = useCart();

  const cartIsValid = isCartValid(inventory, cart);

  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isHydrated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading order details...</p>
      </main>
    );
  }

  function handleOrderConfirmed() {
    setOrderConfirmed(true);
  }

  function handleShippingSubmit(formData: ShippingData) {
    setShippingData(formData);
  }

  function handleBillingSubmit(formData: BillingData) {
    setBillingData(formData);
  }

  if (cart.length === 0 && !orderConfirmed) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Checkout
        </h1>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            Your cart is empty.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/cart"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Back to Cart
            </Link>

            <Link
              href="/orders"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!orderConfirmed && !cartIsValid) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Checkout
        </h1>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
            Some products are unavailable or have insufficient stock. Please
            review your cart before proceeding.
          </p>

          <Link
            href="/cart"
            className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Back to Cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Checkout
      </h1>

      {!orderConfirmed && (
        <p className="mb-4 text-sm font-medium text-gray-600">
          Items in cart:{" "}
          <span className="font-bold text-gray-900">{cart.length}</span>
        </p>
      )}

      <div className="mb-6 space-y-4">
        {cart.map((item) => (
          <CheckoutItem key={item.productId} item={item} />
        ))}
      </div>

      {!orderConfirmed && (
        <div className="mb-6 space-y-6">
          <ShippingForm onSubmit={handleShippingSubmit} />

          <BillingForm onSubmit={handleBillingSubmit} />
        </div>
      )}

      {shippingData && billingData && (
        <div className="mb-6">
          <OrderReview
            shippingData={shippingData}
            billingData={billingData}
            onOrderConfirmed={handleOrderConfirmed}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/cart"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
        >
          Back to Cart
        </Link>

        {orderConfirmed && (
          <Link
            href="/orders"
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            View Orders
          </Link>
        )}
      </div>
    </main>
  );
}
