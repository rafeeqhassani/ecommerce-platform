"use client";

import { useToast } from "@/app/context/ToastContext";

export default function ToastDisplay() {
  const { toast } = useToast();

  return toast.show ? (
    <p
      className={`fixed right-4 top-4 z-50 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg ${
        toast.type === "success"
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {toast.message}
    </p>
  ) : null;
}
