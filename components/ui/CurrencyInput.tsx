"use client";
import React, { useRef } from "react";
import { cn } from "../../lib/cn";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: number;
  onValueChange?: (value: number) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(({ value, onValueChange, onChange, className, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Formata o valor para moeda brasileira
  const formatCurrency = (val: number) => {
    return (val / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  // Remove tudo que não for número
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const num = parseInt(raw || "0", 10);
    if (onValueChange) onValueChange(num / 100);
    if (onChange) onChange(e);
  };

  // Exibe o valor formatado
  const displayValue =
    value !== undefined ? formatCurrency(Math.round((value || 0) * 100)) : "";

  return (
    <input
      ref={ref || inputRef}
      inputMode="numeric"
      pattern="[0-9]*"
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={displayValue}
      onChange={handleInput}
      {...props}
    />
  );
});
CurrencyInput.displayName = "CurrencyInput";
