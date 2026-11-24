"use client";

import { useCart } from "@/app/context/CartContext";

import AdminProductCard from "@/app/components/AdminProductCard";

export default function AdminProductsPage() {
  const { inventory, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Admin Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inventory.map((product) => (
          <AdminProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
