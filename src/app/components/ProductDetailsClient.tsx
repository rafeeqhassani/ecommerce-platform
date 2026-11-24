"use client";

import Link from "next/link";

import Image from "next/image";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsClient({
  productId,
}: {
  productId: number;
}) {
  const { cart, inventory, addToCart, removeFromCart, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading product details...</p>
      </main>
    );
  }

  const currentProduct = inventory.find((item) => item.id === productId);

  if (!currentProduct) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Not Found
        </h1>

        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          The product you are looking for does not exist.
        </p>

        <Link
          href="/products"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  const cartItem = cart.find((item) => item.productId === currentProduct.id);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Product Details
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
          Price: ${currentProduct.price}
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

        <div className="mb-4 flex w-fit items-center gap-3">
          <button
            onClick={() => removeFromCart(currentProduct.id)}
            disabled={!cartItem}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
          >
            -
          </button>

          <span className="min-w-6 text-center text-sm font-semibold text-gray-800">
            {cartItem?.quantity ?? 0}
          </span>

          <button
            onClick={() => addToCart(currentProduct.id)}
            disabled={currentProduct.stockQuantity <= (cartItem?.quantity ?? 0)}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-lg text-white transition-colors hover:bg-blue-700"
          >
            +
          </button>
        </div>

        <Link
          href="/products"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </section>
    </main>
  );
}
