export interface ToastProps {
  message: string;
  type?: "success" | "error";
}

export function Toast({ message, type = "success" }: ToastProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white transition-all ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}
