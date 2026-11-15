import type { CartItem } from "../context/CartContext";
import { getItemTotal } from "@/lib/cart";
import { useCart } from "../context/CartContext";

export default function OrderReviewItem({ item }: { item: CartItem }) {
  const { inventory } = useCart();

  const currentInventoryProduct = inventory.find(
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
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-2 text-base font-semibold text-gray-900">
        {currentInventoryProduct?.name}
      </p>

      <p className="mb-2 text-sm text-gray-600">
        Price: ${currentInventoryProduct?.price}
      </p>

      <p className="mb-2 text-sm text-gray-600">Quantity: {item.quantity}</p>

      <p className="text-sm font-semibold text-gray-900">
        Item Total: ${getItemTotal(currentInventoryProduct, item)}
      </p>
    </div>
  );
}
