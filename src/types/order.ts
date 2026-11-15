import type { ShippingData } from "./shipping";
import type { BillingData } from "./billing";

export type OrderItem = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  shippingCost: number;
  total: number;
  shippingData: ShippingData;
  billingData: BillingData;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  paymentMethod: "cash_on_delivery" | "card" | "bank_transfer";

  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingStatus: "pending" | "processing" | "shipped" | "delivered";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";

  currency: "USD" | "PKR";
};
