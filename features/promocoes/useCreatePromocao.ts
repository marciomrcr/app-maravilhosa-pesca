import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PromocaoFormValues } from "./PromocaoForm";

export function useCreatePromocao() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PromocaoFormValues) => {
      const res = await fetch("/api/promocoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Erro ao criar promoção");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promocoes"] });
    },
  });
}
