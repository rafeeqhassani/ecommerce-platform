import type { CartItem as cartItemType } from "../context/CartContext";
import { getItemTotal } from "@/lib/cart";
import { useCart } from "../context/CartContext";

export default function CheckoutItem({ item }: { item: cartItemType }) {
  const { inventory } = useCart();

  const currentInventoryProduct = inventory?.find(
    (product) => product.id === item.productId,
  );

  if (!currentInventoryProduct) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Product not found in inventory.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        {currentInventoryProduct.name}
      </h2>
      <p className="mb-2 text-sm text-gray-600">
        Quantity:{" "}
        <span className="font-semibold text-gray-900">{item.quantity}</span>
      </p>

      <p className="text-base font-bold text-gray-900">
        Total: ${getItemTotal(currentInventoryProduct, item)}
      </p>
    </div>
  );
}
