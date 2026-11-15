import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-4 py-5">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Admin Area - E-Commerce
          </h1>
          <nav className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Products
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              Customer Store
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
