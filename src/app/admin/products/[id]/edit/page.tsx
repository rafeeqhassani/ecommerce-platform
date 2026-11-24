"use client";

import { use } from "react";
import Link from "next/link";

import { useCart } from "@/app/context/CartContext";
import { useToast } from "@/app/context/ToastContext";
import AdminProductEditForm from "@/app/components/AdminProductEditForm";

export default function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const productId = Number(id);

  const { inventory, updateProduct, isHydrated } = useCart();
  const { showToastMessage } = useToast();

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  const product = inventory.find((item) => item.id === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Not Found
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          The product you are looking for does not exist.
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
    <AdminProductEditForm
      key={product.id}
      product={product}
      productId={productId}
      updateProduct={updateProduct}
      showToastMessage={showToastMessage}
    />
  );
}
