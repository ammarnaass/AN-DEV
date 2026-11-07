import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastProps {
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  type = "success",
  message,
  onClose,
  duration = 4000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeConfig = {
    success: {
      bg: "bg-surface border-ok/40 text-ok",
      icon: <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-ok" />
    },
    error: {
      bg: "bg-surface border-err/40 text-err",
      icon: <AlertCircle className="w-5 h-5 flex-shrink-0 text-err" />
    },
    info: {
      bg: "bg-surface border-accent/40 text-accent",
      icon: <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-accent" />
    }
  };

  const config = typeConfig[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 start-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-card border shadow-lg ${config.bg} backdrop-blur-md max-w-md w-[calc(100%-2rem)] transition-all`}
    >
      {config.icon}
      <p className="text-sm text-ink flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-mute hover:text-ink transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
