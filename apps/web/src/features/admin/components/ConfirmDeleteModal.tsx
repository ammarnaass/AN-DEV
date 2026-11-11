import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => Promise<any>;
  isDeleting: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-md rounded-2xl border border-err/30 bg-surface p-6 space-y-4 shadow-modal">
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <div className="flex items-center gap-2 text-err">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-base font-bold text-text-primary">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-text-muted leading-relaxed whitespace-pre-wrap">
          {message}
        </p>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
          >
            تراجع
          </button>
          <Button variant="danger" isLoading={isDeleting} onClick={onConfirm}>
            حذف نهائي من قاعدة البيانات
          </Button>
        </div>
      </div>
    </div>
  );
};

