"use client";

import { useState, useRef } from "react";

import type { ShippingData } from "@/types/shipping";
import type { BillingData } from "@/types/billing";

import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

import { getSubtotal } from "@/lib/cart";
import OrderReviewItem from "@/app/components/OrderReviewItem";
import type { Order, OrderItem } from "@/types/order";
import { getOrderTotal, getOrderTotalUnits } from "@/lib/order";

import { validateOrderItems } from "@/lib/validate";

export default function OrderReview({
  shippingData,
  billingData,
  onOrderConfirmed,
}: {
  shippingData: ShippingData;
  billingData: BillingData;
  onOrderConfirmed: () => void;
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const { inventory, cart, confirmOrder, clearCart } = useCart();

  const [errors, setErrors] = useState<string[]>([]);

  const { showToastMessage } = useToast();

  const submitLock = useRef(false);

  function handleConfirmOrder() {
    if (submitLock.current) return;

    submitLock.current = true;

    try {
      if (order) return;

      const cartItem = cart.map((item) => {
        return { productId: item.productId, quantity: item.quantity };
      });

      const validateOrderedItems = validateOrderItems(cartItem, inventory);

      if (validateOrderedItems.length > 0) {
        setErrors(validateOrderedItems);

        return;
      }

      setErrors([]);

      const orderItems: OrderItem[] = cart.map((item) => {
        const inventoryCurrentProduct = inventory?.find(
          (product) => product.id === item.productId,
        );

        if (!inventoryCurrentProduct) {
          throw new Error("Product not found in inventory");
        }

        return {
          productId: item.productId,
          productName: inventoryCurrentProduct.name,
          price: inventoryCurrentProduct.price,
          quantity: item.quantity,
        };
      });

      const newOrder: Order = {
        id: crypto.randomUUID(),
        orderNumber: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        shippingCost: 10,
        total: getSubtotal(inventory, cart) + 10,
        shippingData,
        billingData,

        items: orderItems,

        subtotal: getSubtotal(inventory, cart),
        discount: 0,
        tax: 0,
        paymentMethod: "cash_on_delivery",
        status: "confirmed",
        paymentStatus: "pending",
        shippingStatus: "pending",
        currency: "USD",
      };

      const isConfirmed = confirmOrder(newOrder, orderItems);

      if (!isConfirmed) {
        setErrors(validateOrderItems(orderItems, inventory));
        return;
      }

      setOrder(newOrder);
      clearCart();
      onOrderConfirmed();
    } catch (error) {
      console.error("Order confirmation failed", error);
      showToastMessage(
        "Unable to confirm your order. Please try again.",
        "error",
      );
    } finally {
      submitLock.current = false;
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-gray-900 sm:text-2xl">
        {order ? "Order Confirmed" : "Order Review"}
      </h2>

      {!order && (
        <>
          <section className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Shipping Information
            </h3>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">Name: {shippingData.name}</p>
              <p className="text-sm text-gray-600">
                Email: {shippingData.email}
              </p>
              <p className="text-sm text-gray-600">
                Address: {shippingData.address}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {shippingData.phone}
              </p>
            </div>
          </section>

          <section className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Billing Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Name: {billingData.name}</p>
              <p className="text-sm text-gray-600">
                Email: {billingData.email}
              </p>
              <p className="text-sm text-gray-600">
                Address: {billingData.address}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {billingData.phone}
              </p>
            </div>
          </section>

          <section className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Items</h3>

            <div className="space-y-3">
              {cart.map((item) => (
                <OrderReviewItem key={item.productId} item={item} />
              ))}
            </div>

            {errors.length > 0 && (
              <ul className="mb-4 space-y-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.map((error, index) => (
                  <li key={`${error}-${index}`}>{error}</li>
                ))}
              </ul>
            )}

            <div className="border-t border-gray-200 pt-4">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Order Total
              </h3>
              <p className="text-base font-bold text-gray-900">
                Subtotal: ${getSubtotal(inventory, cart).toFixed(2)}
              </p>
            </div>
          </section>
        </>
      )}

      {order && (
        <div>
          <p className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
            Order confirmed successfully!
          </p>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-2 text-sm text-gray-600">
              Order ID:{" "}
              <span className="font-semibold text-gray-900">{order.id}</span>
            </p>
            <p className="mb-2 text-sm text-gray-600">
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

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Customer Information
            </h3>

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
                Address:{" "}
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
          </div>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Billing Information
            </h3>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Billing Name:{" "}
                <span className="font-semibold text-gray-900">
                  {order.billingData.name}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Billing Address:{" "}
                <span className="font-semibold text-gray-900">
                  {order.billingData.address}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Billing Email:{" "}
                <span className="font-semibold text-gray-900">
                  {order.billingData.email}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Billing Phone:{" "}
                <span className="font-semibold text-gray-900">
                  {order.billingData.phone}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Confirmed Products
            </h3>

            <div className="mb-4 space-y-2">
              <p className="text-sm text-gray-600">
                Products:{" "}
                <span className="font-semibold text-gray-900">
                  {order.items.length}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Total Units:{" "}
                <span className="font-semibold text-gray-900">
                  {getOrderTotalUnits(order.items)}
                </span>
              </p>
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-3">
              {order.items.map((item) => (
                <p key={item.productId} className="text-sm text-gray-600">
                  {item.productName} × {item.quantity} —{" "}
                  <span className="font-semibold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>{" "}
                  each
                </p>
              ))}
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Order Summary
            </h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Shipping Cost:{" "}
                <span className="font-semibold text-gray-900">
                  ${order.shippingCost.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Discount:{" "}
                <span className="font-semibold text-gray-900">
                  ${order.discount.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Tax:{" "}
                <span className="font-semibold text-gray-900">
                  ${order.tax.toFixed(2)}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Currency:{" "}
                <span className="font-semibold text-gray-900">
                  {order.currency}
                </span>
              </p>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-lg font-bold text-gray-900">
                  Confirmed Total: ${getOrderTotal(order).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">
              Order Status
            </h3>

            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Order:{" "}
                <span
                  className={`font-semibold ${
                    order.status === "pending"
                      ? "text-amber-700"
                      : order.status === "confirmed" ||
                          order.status === "delivered"
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
              <p className="text-sm text-gray-600">
                Payment:{" "}
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
                Shipping:{" "}
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
            </div>
          </div>

          <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Payment Method
            </h3>

            <p className="text-sm font-medium text-gray-700">
              {order.paymentMethod === "cash_on_delivery"
                ? "Cash on Delivery"
                : order.paymentMethod}
            </p>
          </div>
        </div>
      )}

      {!order && (
        <button
          type="button"
          onClick={handleConfirmOrder}
          className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
        >
          Confirm Order
        </button>
      )}
    </div>
  );
}
