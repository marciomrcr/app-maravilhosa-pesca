import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProdutoFormValues } from "./ProdutoForm";

export function useCreateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProdutoFormValues) => {
      const res = await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao criar produto");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
}
