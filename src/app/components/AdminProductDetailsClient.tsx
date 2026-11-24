"use client";

import Link from "next/link";

import Image from "next/image";

import { useCart } from "@/app/context/CartContext";

export default function AdminProductDetailsClient({
  productId,
}: {
  productId: number;
}) {
  const { inventory, isHydrated } = useCart();

  if (!isHydrated) {
    return <p className="text-gray-600">Loading product details...</p>;
  }

  const currentProduct = inventory.find((item) => item.id === productId);

  if (!currentProduct) {
    return (
      <div className=" mx-auto max-w-4xl px-4 py-8">
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Product not found in inventory.
        </p>

        <Link
          href="/admin/products"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Admin Product Details
      </h1>

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

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/admin/products/${currentProduct.id}/edit`}
            className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Edit
          </Link>

          <Link
            href="/admin/products"
            className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Back to Products
          </Link>
        </div>
      </section>
    </div>
  );
}
