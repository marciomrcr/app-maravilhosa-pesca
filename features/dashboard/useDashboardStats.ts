import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  // Produtos cadastrados
  const produtos = useQuery({
    queryKey: ["produtos"],
    queryFn: async () => {
      const res = await fetch("/api/produtos");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      return res.json();
    },
  });

  // Vendas do dia (exemplo, ajuste a rota conforme sua API)
  const vendas = useQuery({
    queryKey: ["vendas-dia"],
    queryFn: async () => {
      const hoje = new Date().toISOString().slice(0, 10);
      const res = await fetch(`/api/vendas?data=${hoje}`);
      if (!res.ok) throw new Error("Erro ao buscar vendas");
      return res.json();
    },
  });

  // Pedidos pendentes (exemplo, ajuste a rota conforme sua API)
  const pedidos = useQuery({
    queryKey: ["pedidos-pendentes"],
    queryFn: async () => {
      const res = await fetch("/api/pedidos?status=pendente");
      if (!res.ok) throw new Error("Erro ao buscar pedidos");
      return res.json();
    },
  });

  return {
    produtos,
    vendas,
    pedidos,
  };
}
