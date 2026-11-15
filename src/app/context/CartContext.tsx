"use client";

import { createContext, useContext, useState, useReducer } from "react";
import type { Product } from "@/types/product";
import type { Order, OrderItem } from "@/types/order";
import { products } from "@/lib/data/products";

import { validateOrderItems } from "@/lib/validate";

type CartContextType = {
  cart: CartItem[];
  inventory: Product[];

  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  removeItem: (productId: number) => void;
  setCartItemQuantity: (productId: number, quantity: number) => void;

  clearCart: () => void;

  updateProduct: (productId: number, updatedProduct: Product) => void;

  orders: Order[];
  confirmOrder: (order: Order, items: OrderItem[]) => boolean;
  cancelOrder: (orderId: string) => void;
};

export type CartItem = {
  productId: number;
  quantity: number;
};

type OrdersInventoryState = {
  orders: Order[];
  inventory: Product[];
};

type OrdersInventoryAction =
  | {
      type: "CONFIRM_ORDER";
      order: Order;
      items: OrderItem[];
    }
  | {
      type: "UPDATE_PRODUCT";
      productId: number;
      updatedProduct: Product;
    }
  | {
      type: "CANCEL_ORDER";
      orderId: string;
    };

const CartContext = createContext<CartContextType | null>(null);

const initialOrdersInventoryState: OrdersInventoryState = {
  inventory: products,
  orders: [],
};

function reducer(
  state: OrdersInventoryState,
  action: OrdersInventoryAction,
): OrdersInventoryState {
  switch (action.type) {
    case "CONFIRM_ORDER": {
      const errors = validateOrderItems(action.items, state.inventory);

      if (errors.length > 0) {
        return state;
      }
      const updatedInventory = state.inventory.map((product) => {
        const totalOrderedQuantity = action.items.reduce(
          (acc, item) =>
            item.productId === product.id ? acc + item.quantity : acc,
          0,
        );

        if (totalOrderedQuantity === 0) {
          return product;
        }

        return {
          ...product,
          stockQuantity: product.stockQuantity - totalOrderedQuantity,
        };
      });

      return {
        ...state,
        inventory: updatedInventory,
        orders: [...state.orders, action.order],
      };
    }

    case "UPDATE_PRODUCT": {
      const updatedInventoryProduct = state.inventory.map((product) =>
        product.id === action.productId ? action.updatedProduct : product,
      );

      return { ...state, inventory: updatedInventoryProduct };
    }

    case "CANCEL_ORDER": {
      const orderToCancel = state.orders.find(
        (order) => order.id === action.orderId,
      );

      if (!orderToCancel) {
        return state;
      }

      if (
        orderToCancel.status !== "pending" &&
        orderToCancel.status !== "confirmed"
      ) {
        return state;
      }

      const updatedInventory = state.inventory.map((product) => {
        const cancelledOrderItem = orderToCancel.items.find(
          (item) => item.productId === product.id,
        );
        if (!cancelledOrderItem) {
          return product;
        }

        return {
          ...product,
          stockQuantity: product.stockQuantity + cancelledOrderItem.quantity,
        };
      });

      return {
        ...state,
        inventory: updatedInventory,
        orders: state.orders.map((order) =>
          order.id === action.orderId
            ? { ...order, status: "cancelled" }
            : order,
        ),
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [state, dispatch] = useReducer(reducer, initialOrdersInventoryState);

  function addToCart(productId: number) {
    const currentProduct = state.inventory.find(
      (item) => item.id === productId,
    );

    if (!currentProduct || currentProduct.stockQuantity <= 0) {
      return;
    }

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.productId === productId,
      );

      if (!existingItem) {
        return [...previousCart, { productId: currentProduct.id, quantity: 1 }];
      }

      if (existingItem.quantity >= currentProduct.stockQuantity) {
        return previousCart;
      }

      return previousCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function removeFromCart(productId: number) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function setCartItemQuantity(productId: number, quantity: number) {
    const currentProduct = state.inventory.find(
      (product) => product.id === productId,
    );

    if (
      !currentProduct ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > currentProduct.stockQuantity
    ) {
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeItem(productId: number) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.productId !== productId),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function confirmOrder(order: Order, items: OrderItem[]): boolean {
    const errors = validateOrderItems(items, state.inventory);

    if (errors.length > 0) {
      return false;
    }

    dispatch({ type: "CONFIRM_ORDER", order, items });

    return true;
  }

  function updateProduct(productId: number, updatedProduct: Product) {
    dispatch({
      type: "UPDATE_PRODUCT",
      productId,
      updatedProduct,
    });
  }

  function cancelOrder(orderId: string) {
    dispatch({
      type: "CANCEL_ORDER",
      orderId,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        ...state,

        addToCart,
        removeFromCart,
        setCartItemQuantity,
        removeItem,
        clearCart,

        updateProduct,
        confirmOrder,
        cancelOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
