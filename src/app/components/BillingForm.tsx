"use client";

import { useState } from "react";

import type { BillingData } from "@/types/billing";
import { validateBillingData } from "@/lib/validate";
export default function BillingForm({
  onSubmit,
}: {
  onSubmit: (formData: BillingData) => void;
}) {
  const [formData, setFormData] = useState<BillingData>({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const field = name as keyof BillingData;

    setFormData((prevData) => {
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateBillingData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-5 text-xl font-bold text-gray-900">
        Enter Billing Information
      </h2>

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
          Billing Name
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
          htmlFor="address"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Billing Address
        </label>

        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Billing Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Billing Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
      >
        Submit Billing Information
      </button>
    </form>
  );
}
