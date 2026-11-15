"use client";

import Link from "next/link";
import Image from "next/image";

import { useCart } from "../context/CartContext";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, inventory, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.productId === product.id);

  const currentProduct = inventory.find((item) => item.id === product.id);

  if (!currentProduct) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Product not found in inventory.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">
        {currentProduct.name}
      </h2>

      <div className="mb-3 flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-gray-50">
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
        className={`mb-2 text-sm font-medium ${currentProduct.stockQuantity > 0 ? "text-green-600" : "text-red-600"}`}
      >
        {currentProduct.stockQuantity > 0
          ? `Stock: ${currentProduct.stockQuantity}`
          : "Out of stock"}
      </p>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {currentProduct.description}
      </p>

      <div className="mb-4 flex w-fit items-center gap-3">
        <button
          onClick={() => removeFromCart(product.id)}
          disabled={!cartItem}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
        >
          -
        </button>

        <span className="min-w-6 text-center text-sm font-semibold text-gray-800">
          {cartItem?.quantity ?? 0}
        </span>

        <button
          onClick={() => addToCart(product.id)}
          disabled={
            !currentProduct ||
            currentProduct.stockQuantity <= (cartItem?.quantity ?? 0)
          }
          className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-lg text-white transition-colors hover:bg-blue-700"
        >
          +
        </button>
      </div>

      <Link
        href={`/products/${product.id}`}
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
