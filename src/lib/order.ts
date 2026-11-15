import type { Order } from "@/types/order";
import type { OrderItem } from "@/types/order";

export function getOrderTotal(order: Order) {
  return order.total;
}

export function getOrderTotalUnits(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}
