import Link from "next/link";

import { products } from "@/lib/data/products";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  const product = products.find((product) => product.id === productId);

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Not Found
        </h1>
        <p>The product you are looking for does not exist.</p>

        <Link
          href="/products"
          className="inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Product Details
      </h1>
      <ProductDetailsClient product={product} />

      <Link
        href="/products"
        className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
      >
        Back to Products
      </Link>
    </main>
  );
}
