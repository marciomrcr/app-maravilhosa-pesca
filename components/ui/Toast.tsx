import { useEffect, useState } from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "success",
  duration = 5000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Fechar o toast automaticamente após a duração especificada
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExitAnimation(true);

      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 300); // Duração da animação de saída
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  if (!visible) return null;

  // Definição dos ícones e cores baseados no tipo
  const iconAndColors = {
    success: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-accent-100",
      borderColor: "border-accent-500",
      textColor: "text-accent-800",
      iconColor: "text-accent-600",
    },
    error: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-red-100",
      borderColor: "border-red-500",
      textColor: "text-red-800",
      iconColor: "text-red-600",
    },
  };

  const { icon, bgColor, borderColor, textColor, iconColor } =
    iconAndColors[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center max-w-md transition-all duration-300 transform 
        ${
          exitAnimation
            ? "opacity-0 translate-y-[-20px]"
            : "opacity-100 translate-y-0"
        }`}
    >
      <div
        className={`flex items-center p-4 rounded-md shadow-lg border-l-4 ${borderColor} ${bgColor}`}
      >
        <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          type="button"
          className={`ml-6 ${iconColor} hover:text-gray-500 focus:outline-none`}
          onClick={() => {
            setExitAnimation(true);
            setTimeout(() => {
              setVisible(false);
              if (onClose) onClose();
            }, 300);
          }}
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
