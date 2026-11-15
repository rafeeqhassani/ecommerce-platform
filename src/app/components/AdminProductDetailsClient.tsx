"use client";

import Link from "next/link";

import Image from "next/image";

import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/types/product";

export default function AdminProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const { inventory } = useCart();

  const currentProduct = inventory.find((item) => item.id === product.id);
  if (!currentProduct) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Product not found in inventory.
      </p>
    );
  }

  return (
    <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        {currentProduct.name}
      </h2>

      <div className="mb-3 flex h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={currentProduct.image}
          alt={currentProduct.name}
          width={300}
          height={300}
          loading="eager"
          className="h-full w-full object-contain"
        />
      </div>

      <p className="mb-2 text-lg font-bold text-blue-600">
        ${currentProduct.price}
      </p>
      <p className="mb-2 text-sm text-gray-500">
        Category: {currentProduct.category}
      </p>

      <p
        className={`mb-2 text-sm font-medium ${currentProduct.stockQuantity > 0 ? "text-green-700" : "text-red-700"}`}
      >
        {currentProduct.stockQuantity > 0
          ? `Stock: ${currentProduct.stockQuantity}`
          : "Out of stock"}
      </p>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {currentProduct.description}
      </p>

      <Link
        href={`/admin/products/${product.id}/edit`}
        className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
      >
        Edit
      </Link>
    </section>
  );
}
