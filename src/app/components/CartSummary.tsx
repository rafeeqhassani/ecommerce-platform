"use client";

import Link from "next/link";

import { useCart } from "../context/CartContext";
import { getTotalUnits, getSubtotal, isCartValid } from "@/lib/cart";

export default function CartSummary() {
  const { cart, inventory, clearCart } = useCart();

  const cartIsValid = isCartValid(inventory, cart);

  if (cart.length === 0) {
    return null;
  }

  const totalUnits = getTotalUnits(cart);

  const subtotal = getSubtotal(inventory, cart);

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 space-y-2">
        <p className="text-sm text-gray-600">
          Total products:{" "}
          <span className="font-semibold text-gray-900">{cart.length}</span>
        </p>

        <p className="text-sm text-gray-600">
          Total units:{" "}
          <span className="font-semibold text-gray-900">{totalUnits}</span>
        </p>
      </div>

      {cartIsValid && (
        <p className="mb-4 border-t border-gray-200 pt-3 text-lg font-bold text-gray-900">
          Subtotal: ${subtotal.toFixed(2)}
        </p>
      )}

      <button
        onClick={clearCart}
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
      >
        Clear Cart
      </button>
      <br />

      {cartIsValid ? (
        <Link
          href="/checkout"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Checkout
        </Link>
      ) : (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-relaxed text-red-700">
          Some products in your cart are unavailable or have insufficient stock.
          Please review your cart before proceeding.
        </p>
      )}
    </div>
  );
}
