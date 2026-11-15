"use client";

import { useState } from "react";

import { useCart } from "../context/CartContext";
import type { CartItem as CartItemType } from "../context/CartContext";
import { getItemTotal } from "@/lib/cart";

export default function CartItem({ item }: { item: CartItemType }) {
  const {
    inventory,
    addToCart,
    removeFromCart,
    removeItem,
    setCartItemQuantity,
  } = useCart();

  const [quantityInput, setQuantityInput] = useState(String(item.quantity));

  const currentProduct = inventory.find(
    (inventoryProduct) => inventoryProduct.id === item.productId,
  );

  if (!currentProduct) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Product not found in inventory.
      </p>
    );
  }

  function handleQuantityChange(value: string) {
    setQuantityInput(value);
  }

  const maxStockQuantity = currentProduct.stockQuantity;

  function handleQuantityBlur() {
    if (quantityInput.trim() === "") {
      setQuantityInput(String(item.quantity));
      return;
    }

    const quantity = Number(quantityInput);

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > maxStockQuantity
    ) {
      setQuantityInput(String(item.quantity));
      return;
    }

    setCartItemQuantity(item.productId, quantity);
  }

  return (
    <div className="mb-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div>
        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          {currentProduct.name}
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          Price: ${currentProduct.price}
        </p>
      </div>

      <div className="flex w-fit items-center gap-3">
        <button
          onClick={() => {
            removeFromCart(item.productId);
            setQuantityInput(String(Math.max(1, item.quantity - 1)));
          }}
          disabled={item.quantity <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 text-lg text-gray-700 transition-colors hover:bg-gray-100"
        >
          -
        </button>

        <input
          type="number"
          min={1}
          max={maxStockQuantity}
          step={1}
          value={quantityInput}
          onChange={(event) => handleQuantityChange(event.target.value)}
          onBlur={handleQuantityBlur}
          aria-label={`Quantity for ${currentProduct.name}`}
          className="h-9 w-16 rounded-md border border-gray-300 text-center text-sm font-semibold text-gray-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        <button
          onClick={() => {
            addToCart(item.productId);
            setQuantityInput(
              String(Math.min(currentProduct.stockQuantity, item.quantity + 1)),
            );
          }}
          disabled={item.quantity >= currentProduct.stockQuantity}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-600 text-lg text-white transition-colors hover:bg-blue-700"
        >
          +
        </button>
      </div>

      {currentProduct.stockQuantity >= item.quantity && (
        <p className="text-base font-semibold text-gray-900">
          Total: ${getItemTotal(currentProduct, item)}
        </p>
      )}

      <button
        onClick={() => removeItem(item.productId)}
        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        Remove Item
      </button>
    </div>
  );
}
