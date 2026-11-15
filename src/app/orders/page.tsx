"use client";

import Link from "next/link";

import { useCart } from "@/app/context/CartContext";

export default function OrdersPage() {
  const { orders } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        My Orders
      </h1>

      <p className="mb-6 text-sm font-medium text-gray-600">
        Total Orders:{" "}
        <span className="font-bold text-gray-900">{orders.length}</span>
      </p>

      {orders.map((order) => (
        <section
          key={order.id}
          className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            {order.orderNumber}
          </h2>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Order Date:{" "}
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Total:{" "}
              <span className="font-bold text-gray-900">
                ${order.total.toFixed(2)}
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-semibold text-green-700">
                {order.status}
              </span>
            </p>
          </div>
          <Link
            href={`/orders/${order.id}`}
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View Details
          </Link>
        </section>
      ))}
      <Link
        href="/products"
        className="inline-block rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
