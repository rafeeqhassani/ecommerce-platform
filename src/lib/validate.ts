import type { Product } from "@/types/product";

import type { OrderItem } from "@/types/order";
import type { ShippingData } from "@/types/shipping";
import type { BillingData } from "@/types/billing";

export function validateProduct(product: Product) {
  const errors: string[] = [];

  if (!product.name.trim()) {
    errors.push("Name is required");
  }

  if (!product.price || !Number.isFinite(product.price) || product.price <= 0) {
    errors.push("Price is required and must be a positive number");
  }

  if (!product.category.trim()) {
    errors.push("Category is required");
  }

  if (!product.image.trim()) {
    errors.push("Image is required");
  }

  if (!product.description.trim()) {
    errors.push("Description is required");
  }

  if (!Number.isInteger(product.stockQuantity) || product.stockQuantity < 0) {
    errors.push(
      "Stock quantity is required and must be a non-negative integer",
    );
  }

  return errors;
}

export function validateOrderItems(
  items: Pick<OrderItem, "productId" | "quantity">[],

  inventory: Product[],
): string[] {
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push("Your cart is empty");
  }

  items.forEach((item) => {
    const currentInventoryProduct = inventory.find(
      (inventoryProduct) => inventoryProduct.id === item.productId,
    );

    if (!currentInventoryProduct) {
      errors.push("Product not found");
    } else if (
      !Number.isInteger(currentInventoryProduct.stockQuantity) ||
      currentInventoryProduct.stockQuantity < 0
    ) {
      errors.push(
        "Stock quantity is required and must be a non-negative integer",
      );
    } else if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      errors.push("Quantity must be a positive integer");
    }
  });

  if (errors.length === 0) {
    const quantitiesByProduct = items.reduce(
      (total, item) => {
        if (total[item.productId] !== undefined) {
          total[item.productId] = total[item.productId] + item.quantity;
        } else {
          total[item.productId] = item.quantity;
        }

        return total;
      },
      {} as Record<number, number>,
    );

    Object.entries(quantitiesByProduct).forEach(
      ([productId, totalQuantity]) => {
        const product = inventory.find(
          (inventoryProduct) => inventoryProduct.id === Number(productId),
        );

        if (product && totalQuantity > product.stockQuantity) {
          errors.push("Product stock is insufficient for this order");
        }
      },
    );
  }

  return errors;
}

// Form validation functions

function isOnlyNumbers(value: string) {
  return /^\d+$/.test(value.trim());
}

function validateText(value: string, fieldName: string) {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  if (isOnlyNumbers(value)) {
    return `${fieldName} cannot be only numbers`;
  }

  return null;
}

function validateEmail(email: string) {
  const value = email.trim();

  if (!value) {
    return "Email is required";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Invalid email format";
  }

  return null;
}

function validatePhone(phone: string) {
  const value = phone.trim();

  if (!value) {
    return "Phone number is required";
  }

  const normalizedPhone = value.replace(/[\s-]/g, "");

  if (!/^(03\d{9}|\+923\d{9}|923\d{9})$/.test(normalizedPhone)) {
    return "Enter a valid Pakistani phone number";
  }

  return null;
}

function validateRequired(value: string, fieldName: string) {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }

  return null;
}

export function validateShippingData(shippingData: ShippingData) {
  const errors: string[] = [];

  const emailError = validateEmail(shippingData.email);

  const nameError = validateText(shippingData.name, "Name");

  if (nameError) {
    errors.push(nameError);
  }

  if (emailError) {
    errors.push(emailError);
  }

  const addressError = validateRequired(shippingData.address, "Address");

  if (addressError) {
    errors.push(addressError);
  }

  const phoneError = validatePhone(shippingData.phone);

  if (phoneError) {
    errors.push(phoneError);
  }

  return errors;
}

export function validateBillingData(billingData: BillingData) {
  const errors: string[] = [];

  const emailError = validateEmail(billingData.email);

  const nameError = validateText(billingData.name, "Name");

  if (nameError) {
    errors.push(nameError);
  }

  if (emailError) {
    errors.push(emailError);
  }

  const addressError = validateRequired(billingData.address, "Address");

  if (addressError) {
    errors.push(addressError);
  }

  const phoneError = validatePhone(billingData.phone);

  if (phoneError) {
    errors.push(phoneError);
  }

  return errors;
}
