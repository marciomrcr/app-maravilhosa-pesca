"use client";
import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
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
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 8;

  // Filtrando produtos baseado no termo de busca
  const filteredData =
    data?.filter(
      (produto: Produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (produto.categoria &&
          produto.categoria.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (produto.fornecedor &&
          produto.fornecedor.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

  const total = filteredData.length || 0;
  const totalPages = Math.ceil(total / pageSize);
  const paginated =
    filteredData.slice((page - 1) * pageSize, page * pageSize) || [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 text-red-800 p-4 rounded-md">
        <p className="font-medium">Erro ao carregar produtos</p>
        <p className="text-sm mt-1">
          Tente novamente mais tarde ou contate o suporte
        </p>
      </div>
    );

  return (
    <div className="w-full">
      {/* Barra de busca e filtros */}
      <div className="mb-4 p-4 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative w-full sm:w-auto flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="text-gray-700 pl-10 pr-4 py-2 w-full border-gray-300 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex gap-2 self-end">
            <Button
              size="sm"
              variant="outline"
              className="border-primary-200 text-primary-700 bg-black hover:bg-primary-50"
              onClick={() => setSearchTerm("")}
            >
              Limpar
            </Button>
          </div>
        </div>
      </div>

      {/* Tabela de produtos */}
      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="group px-3 py-3 text-left">
                <div className="text-gray-700 flex items-center gap-1 font-semibold text-primary-800 hover:text-primary-900">
                  Nome
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <path d="M7 10l5 5 5-5" />
                  </svg>
                </div>
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Categoria
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Unidade
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Fornecedor
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-accent-600">
                Preço
              </th>
              <th className="px-3 py-3 text-left font-semibold text-gray-700">
                Custo
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Estoque
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Status
              </th>
              <th className="px-3 py-3 text-gray-700 text-left font-semibold text-primary-800">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginated.length > 0 ? (
              paginated.map((produto: Produto) => (
                <tr
                  key={produto.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-4 font-medium text-gray-900">
                    {produto.nome}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {produto.categoria ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {produto.categoria}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {produto.unidade || (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-gray-600">
                    {produto.fornecedor || (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-gray-700 font-semibold">
                    R$ {produto.preco.toFixed(2)}
                  </td>
                  <td className="px-3 py-4 text-gray-500">
                    R$ {produto.precoCusto.toFixed(2)}
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        produto.estoque <= 5
                          ? "bg-red-100 text-red-800"
                          : produto.estoque <= 15
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {produto.estoque}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        produto.ativo
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {produto.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary-200 text-primary-700 bg-green-500 hover:bg-primary-50"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-500 bg-gray-200 hover:bg-red-50"
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="font-medium">Nenhum produto encontrado</p>
                    <p className="text-sm mt-1">
                      Tente uma busca diferente ou cadastre um novo produto
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação aprimorada */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="text-sm text-gray-700 sm:flex-1">
            <span>Mostrando </span>
            <span className="font-medium">{(page - 1) * pageSize + 1}</span>
            <span> - </span>
            <span className="font-medium">
              {Math.min(page * pageSize, total)}
            </span>
            <span> de </span>
            <span className="font-medium">{total}</span>
            <span> resultados</span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-100"
              disabled={page === 1}
              onClick={() => setPage(1)}
            >
              Primeira
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-100"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </Button>

            {/* Números de página */}
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (page <= 3) {
                  pageNumber = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = page - 2 + i;
                }

                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={pageNumber === page ? "default" : "outline"}
                    className={
                      pageNumber === page
                        ? "bg-primary-600 text-white border-primary-600"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-100"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Próxima
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:bg-gray-100"
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              Última
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
