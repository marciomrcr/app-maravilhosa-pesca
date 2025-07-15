"use client";
import React from "react";
import { Button } from "../../components/ui/Button";
import { useProdutos } from "./useProdutos";

export interface Produto {
  id: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  unidade?: string;
  preco: number;
  precoCusto: number;
  fornecedor?: string;
  estoque: number;
  ativo: boolean;
}

export function ProdutoList() {
  const { data, isLoading, error } = useProdutos();
  const [page, setPage] = React.useState(1);
  const pageSize = 8;
  const total = data?.length || 0;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = data?.slice((page - 1) * pageSize, page * pageSize) || [];

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar produtos</div>;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-100 bg-zinc-50 shadow-sm">
      <table className="min-w-full md:table divide-y divide-zinc-100 text-sm bg-white">
        <thead className="bg-zinc-50 sticky top-0 z-10">
          <tr>
            <th className="px-2 py-3 text-left font-semibold text-zinc-600 whitespace-nowrap">
              Nome
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Categoria
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Unidade
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Fornecedor
            </th>
            <th className="px-2 py-3 text-left font-semibold text-green-600 whitespace-nowrap">
              Preço
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-400 whitespace-nowrap">
              Custo
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Estoque
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Status
            </th>
            <th className="px-2 py-3 text-left font-semibold text-zinc-700 whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50 bg-white">
          {paginated.map((produto: Produto) => (
            <tr key={produto.id} className="hover:bg-zinc-100 transition-all">
              <td className="px-2 py-3 font-medium text-zinc-700 whitespace-nowrap">
                {produto.nome}
              </td>
              <td className="px-2 py-3 text-zinc-500 whitespace-nowrap">
                {produto.categoria || "-"}
              </td>
              <td className="px-2 py-3 text-zinc-600 whitespace-nowrap">
                {produto.unidade || "-"}
              </td>
              <td className="px-2 py-3 text-zinc-600 whitespace-nowrap">
                {produto.fornecedor || "-"}
              </td>
              <td className="px-2 py-3 text-green-600 font-semibold whitespace-nowrap">
                R$ {produto.preco.toFixed(2)}
              </td>
              <td className="px-2 py-3 text-zinc-400 whitespace-nowrap">
                R$ {produto.precoCusto.toFixed(2)}
              </td>
              <td
                className={`px-2 py-3 font-bold whitespace-nowrap ${
                  produto.estoque <= 5 ? "text-red-500" : "text-green-600"
                }`}
              >
                {produto.estoque}
              </td>
              <td className="px-2 py-3 whitespace-nowrap">
                <span
                  className={
                    produto.ativo
                      ? "text-green-600 font-bold"
                      : "text-zinc-400 font-bold"
                  }
                >
                  {produto.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="px-2 py-3 flex gap-2 whitespace-nowrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-200 text-zinc-600 bg-white hover:bg-zinc-100"
                >
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-500 bg-white hover:bg-red-50"
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginação responsiva */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between md:justify-end items-center gap-2 px-4 py-3 bg-zinc-100 border-t border-zinc-100">
          <div className="flex gap-2 mb-2 md:mb-0">
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Próxima
            </Button>
          </div>
          <span className="text-xs text-zinc-500">
            Página {page} de {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
