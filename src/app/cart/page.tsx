"use client";

import Link from "next/link";

import { useCart } from "../context/CartContext";

import CartItem from "@/app/components/CartItem";
import CartSummary from "@/app/components/CartSummary";
import CartEmptyState from "@/app/components/CartEmptyState";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Shopping Cart
      </h1>

      <Link
        href="/products"
        className="inline-block mb-6 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
      >
        Continue Shopping
      </Link>

      {cart.length === 0 && <CartEmptyState />}

      {cart.length > 0 && (
        <>
          <CartSummary />

          {cart.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </>
      )}
    </main>
  );
}
