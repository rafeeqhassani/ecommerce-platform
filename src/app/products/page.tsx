"use client";

import { useCart } from "@/app/context/CartContext";

import ProductCard from "@/app/components/ProductCard";
import CartLink from "@/app/components/CartLink";

export default function ProductsPage() {
  const { inventory } = useCart();

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Products
      </h1>
      <CartLink />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventory.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
