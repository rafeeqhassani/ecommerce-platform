import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        E-Commerce Platform
      </h1>
      <p className="mb-6 text-base leading-relaxed text-gray-600">
        Products, inventory, orders, and administration.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/products"
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Browse Products
        </Link>

        <Link
          href="/admin"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Admin Panel
        </Link>
      </div>
    </main>
  );
}
