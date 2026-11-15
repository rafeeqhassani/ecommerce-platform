import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1400,
    category: "Electronics",
    image: "/images/laptop.jpg",
    description: "A powerful laptop for work, study, and everyday use.",
    stockQuantity: 10,
  },
  {
    id: 2,
    name: "Wireless Mouse",
    price: 35,
    category: "Accessories",
    image: "/images/wireless-mouse.jpg",
    description: "A sleek and ergonomic wireless mouse for precise control.",
    stockQuantity: 10,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 80,
    category: "Accessories",
    image: "/images/keyboard.jpg",
    description: "A comfortable and responsive keyboard for efficient typing.",
    stockQuantity: 10,
  },
];
