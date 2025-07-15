import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      nome: string;
      categoria: string;
      unidade: string;
      preco: number;
    }) => {
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
