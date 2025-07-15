"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [displayValue, setDisplayValue] = useState("");

  // Formatar o valor para exibição no formato brasileiro
  const formatCurrency = (value: number): string => {
    if (value === 0) return "";
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Atualiza o valor de exibição quando o valor muda
  useEffect(() => {
    setDisplayValue(formatCurrency(Number(value) || 0));
  }, [value]);

  // Processa a entrada do usuário
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Remove qualquer caractere que não seja dígito
    const digitsOnly = inputValue.replace(/\D/g, "");

    // Converte para número (considera como centavos)
    const numericValue = parseInt(digitsOnly, 10) || 0;

    // Converte de centavos para reais (divide por 100)
    const valueAsDecimal = numericValue / 100;

    // Atualiza o valor exibido no formato brasileiro
    setDisplayValue(formatCurrency(valueAsDecimal));

    // Notifica sobre a mudança de valor
    if (onValueChange) onValueChange(valueAsDecimal);
    if (onChange) onChange(e);
  };

  // Quando o input ganha foco
  const handleFocus = () => {
    // Mantém o valor formatado ao ganhar foco
  };

  // Quando o input perde foco
  const handleBlur = () => {
    // Garante que o valor está formatado corretamente
    setDisplayValue(formatCurrency(Number(value) || 0));
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-2 text-gray-500">R$</span>
      <input
        ref={ref || inputRef}
        inputMode="numeric"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={displayValue}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="0,00"
        {...props}
      />
    </div>
  );
});

CurrencyInput.displayName = "CurrencyInput";
CurrencyInput.displayName = "CurrencyInput";
