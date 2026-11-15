"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";

import ToastDisplay from "../components/ToastDisplay";

type ToastContextType = {
  toast: Toast;
  showToastMessage: (message: string, type?: Toast["type"]) => void;
};

export type Toast = {
  show: boolean;
  message: string;
  type: "success" | "error";
};

const ToastContext = createContext<ToastContextType | null>(null);

const TOAST_DURATION_MS = 3000;

const HIDDEN_TOAST: Toast = { show: false, message: "", type: "success" };

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [toast, setToast] = useState<Toast>(HIDDEN_TOAST);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToastMessage = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      if (!message) return;

      if (toastTimerRef.current !== null) {
        clearTimeout(toastTimerRef.current);
      }

      setToast({ show: true, message, type });

      toastTimerRef.current = setTimeout(() => {
        setToast(HIDDEN_TOAST);
        toastTimerRef.current = null;
      }, TOAST_DURATION_MS);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast, showToastMessage }}>
      {children}
      <ToastDisplay />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}
