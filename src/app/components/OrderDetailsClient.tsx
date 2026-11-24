"use client";

import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { getOrderTotal } from "@/lib/order";

export default function OrderDetailsClient({ orderId }: { orderId: string }) {
  const { orders, cancelOrder, isHydrated } = useCart();

  if (!isHydrated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-gray-600">Loading order details...</p>
      </main>
    );
  }

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Order Not Found
        </h1>
        <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700">
          This order could not be found in the current session.
        </p>
        <Link
          href="/orders"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to My Orders
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Order Details
      </h1>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Order Information
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Order Number:{" "}
            <span className="font-semibold text-gray-900">
              {order.orderNumber}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Order Date:{" "}
            <span className="font-semibold text-gray-900">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Customer Information
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Customer:{" "}
            <span className="font-semibold text-gray-900">
              {order.shippingData.name}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Email:{" "}
            <span className="font-semibold text-gray-900">
              {order.shippingData.email}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Shipping Address:{" "}
            <span className="font-semibold text-gray-900">
              {order.shippingData.address}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Phone:{" "}
            <span className="font-semibold text-gray-900">
              {order.shippingData.phone}
            </span>
          </p>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Billing Information
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Name:{" "}
            <span className="font-semibold text-gray-900">
              {order.billingData.name}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Email:{" "}
            <span className="font-semibold text-gray-900">
              {order.billingData.email}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Billing Address:{" "}
            <span className="font-semibold text-gray-900">
              {order.billingData.address}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Phone:{" "}
            <span className="font-semibold text-gray-900">
              {order.billingData.phone}
            </span>
          </p>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Items</h2>

        {order.items.map((item) => (
          <section
            key={item.productId}
            className="mb-3 rounded-lg border border-gray-200 p-4 last:mb-0"
          >
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              {item.productName}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              Quantity: {item.quantity}
            </p>
            <p className="mb-2 text-sm text-gray-600">
              Price: ${item.price.toFixed(2)}
            </p>
            <p className="mb-2 text-sm text-gray-600">
              Line Total:{" "}
              <span className="font-semibold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </p>
          </section>
        ))}
      </section>

      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Payment and Shipping
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Payment Method:{" "}
            <span className="font-semibold text-gray-900">
              {order.paymentMethod === "cash_on_delivery"
                ? "Cash on Delivery"
                : order.paymentMethod}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Payment Status:{" "}
            <span
              className={`font-semibold ${
                order.paymentStatus === "pending"
                  ? "text-amber-700"
                  : order.paymentStatus === "paid"
                    ? "text-green-700"
                    : order.paymentStatus === "failed"
                      ? "text-red-700"
                      : order.paymentStatus === "refunded"
                        ? "text-purple-700"
                        : "text-gray-900"
              }`}
            >
              {order.paymentStatus}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Shipping Status:{" "}
            <span
              className={`font-semibold ${
                order.shippingStatus === "pending" ||
                order.shippingStatus === "processing"
                  ? "text-amber-700"
                  : order.shippingStatus === "shipped"
                    ? "text-blue-700"
                    : order.shippingStatus === "delivered"
                      ? "text-green-700"
                      : "text-gray-900"
              }`}
            >
              {order.shippingStatus}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Order Status:{" "}
            <span
              className={`font-semibold ${
                order.status === "pending"
                  ? "text-amber-700"
                  : order.status === "confirmed" || order.status === "delivered"
                    ? "text-green-700"
                    : order.status === "shipped"
                      ? "text-blue-700"
                      : order.status === "cancelled"
                        ? "text-red-700"
                        : "text-gray-900"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>
      </section>

      {(order.status === "pending" || order.status === "confirmed") && (
        <button
          onClick={() => cancelOrder(order.id)}
          className="mb-5 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          Cancel Order
        </button>
      )}
      <section className="mb-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Totals</h2>
        <div className="space-y-3">
          <p className="flex items-center justify-between text-sm text-gray-600">
            Subtotal: ${order.subtotal.toFixed(2)}
          </p>
          <p className="flex items-center justify-between text-sm text-gray-600">
            Shipping: ${order.shippingCost.toFixed(2)}
          </p>
          <p className="flex items-center justify-between text-sm text-gray-600">
            Discount: ${order.discount.toFixed(2)}
          </p>
          <p className="flex items-center justify-between text-sm text-gray-600">
            Tax: ${order.tax.toFixed(2)}
          </p>
          <p className="flex items-center justify-between border-t border-gray-200 pt-3 text-base font-bold text-gray-900">
            Grand Total: ${getOrderTotal(order).toFixed(2)}
          </p>
        </div>
      </section>

      <Link
        href="/orders"
        className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
      >
        Back to My Orders
      </Link>
    </main>
  );
}
