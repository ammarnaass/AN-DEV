import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  size = "md",
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm h-9",
    md: "px-5 py-2.5 text-base h-12", // 48px height per PRD
    lg: "px-7 py-3.5 text-lg h-14"
  };

  const variantStyles = {
    primary: "btn-primary bg-gradient-to-r from-primary to-accent text-[#050816] hover:brightness-110 active:brightness-95 shadow-glow",
    secondary: "border border-primary text-primary hover:bg-primary/10 active:bg-primary/20 bg-transparent",
    danger: "border border-err text-err hover:bg-err/10 active:bg-err/20 bg-transparent",
    ghost: "text-ink hover:text-accent hover:bg-surface/50 bg-transparent"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};
