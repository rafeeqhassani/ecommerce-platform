import type { CartItem } from "@/app/context/CartContext";
import type { Product } from "@/types/product";

export function getTotalUnits(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getSubtotal(
  inventory: Product[] | undefined,
  cart: CartItem[],
) {
  const subtotal = cart.reduce((total, item) => {
    const inventoryCurrentProduct = inventory?.find(
      (product) => product.id === item.productId,
    );

    if (!inventoryCurrentProduct) {
      return total;
    }

    return total + inventoryCurrentProduct.price * item.quantity;
  }, 0);

  return subtotal;
}

export function isCartValid(
  inventory: Product[] | undefined,
  cart: CartItem[],
) {
  if (!inventory) return false;

  return cart.every((item) => {
    const product = inventory.find((p) => p.id === item.productId);

    if (!product || product.stockQuantity <= 0) {
      return false;
    }
    return product.stockQuantity >= item.quantity;
  });
}

export function getItemTotal(
  inventoryProduct: Product | undefined,
  item: CartItem,
) {
  if (!inventoryProduct) {
    return null;
  }
  return inventoryProduct.price * item.quantity;
}
