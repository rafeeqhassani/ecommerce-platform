"use client";

import React, { use } from "react";

import Link from "next/link";

import { useState } from "react";

import type { Product as productType } from "@/types/product";
import { useCart } from "@/app/context/CartContext";
import { validateProduct } from "@/lib/validate";
import { useToast } from "@/app/context/ToastContext";

type ProductFormData = Omit<productType, "price" | "stockQuantity"> & {
  price: string;
  stockQuantity: string;
};

export default function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const productId = Number(id);
  const { inventory, updateProduct } = useCart();

  const product = inventory.find((item) => item.id === productId);

  const [formData, setFormData] = useState<ProductFormData | null>(
    product
      ? {
          ...product,
          price: String(product.price),
          stockQuantity: String(product.stockQuantity),
        }
      : null,
  );
  const [errors, setErrors] = useState<string[]>([]);

  const { showToastMessage } = useToast();

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Product Not Found
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          The product you are looking for does not exist.
        </p>

        <Link
          href="/admin/products"
          className="inline-block rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!formData) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
        Form data is not available.
      </p>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;

    const field = name as keyof ProductFormData;

    setFormData((prevFormData) => {
      if (!prevFormData) return prevFormData;
      return { ...prevFormData, [field]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.stockQuantity.trim() === "") {
      setErrors(["Stock quantity is required"]);

      return;
    }

    setErrors([]);

    const updatedFormData = {
      ...formData,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
    };

    const validationErrors = validateProduct(updatedFormData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      return;
    }

    updateProduct(productId, updatedFormData);

    showToastMessage("Product updated successfully", "success");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
        Edit Product
      </h1>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        {errors.length > 0 && (
          <ul className="mb-5 space-y-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price
          </label>

          <input
            id="price"
            name="price"
            type="number"
            step="any"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>

          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="stockQuantity"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>

          <input
            id="stockQuantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Save Changes
          </button>

          <Link
            href={`/admin/products/${productId}`}
            className="w-full rounded-lg border border-gray-300 px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 sm:w-auto"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
