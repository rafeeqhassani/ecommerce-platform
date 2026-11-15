import Link from "next/link";

import type { Product } from "@/types/product";

export default function AdminProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        {product.name}
      </h2>
      <p className="mb-3 text-base font-bold text-blue-600">
        Price: ${product.price}
      </p>

      <p
        className={`mb-4 text-sm font-medium ${
          product.stockQuantity > 0 ? "text-green-700" : "text-red-700"
        }`}
      >
        {product.stockQuantity > 0
          ? `Stock: ${product.stockQuantity}`
          : "Out of stock"}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/admin/products/${product.id}`}
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          View Details
        </Link>

        <Link
          href={`/admin/products/${product.id}/edit`}
          className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
