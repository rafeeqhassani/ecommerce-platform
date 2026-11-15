"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { getTotalUnits } from "@/lib/cart";

export default function CartLink() {
  const { cart } = useCart();

  const totalUnits = getTotalUnits(cart);

  return (
    <Link
      href="/cart"
      className="mb-6 inline-block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
    >
      Cart ({totalUnits})
    </Link>
  );
}
