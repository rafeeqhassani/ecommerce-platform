import Link from "next/link";

import { products } from "@/lib/data/products";
import AdminProductDetailsClient from "@/app/components/AdminProductDetailsClient";

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productId = Number(id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <div>
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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Admin Product Details
      </h1>
      <AdminProductDetailsClient product={product} />

      <Link
        href="/admin/products"
        className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
      >
        Back to Products
      </Link>
    </div>
  );
}
