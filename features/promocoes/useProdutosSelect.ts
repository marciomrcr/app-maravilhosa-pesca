import { useQuery } from "@tanstack/react-query";

export function useProdutosSelect() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const res = await fetch("/api/produtos");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return res.json();
    },
  });
}
