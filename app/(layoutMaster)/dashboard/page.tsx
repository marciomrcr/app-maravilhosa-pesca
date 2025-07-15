"use client";

import type { Venda } from "@/features/dashboard/types";
import { useDashboardStats } from "@/features/dashboard/useDashboardStats";
import { signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { produtos, vendas, pedidos } = useDashboardStats();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redireciona para login se não autenticado
      window.location.href = "/login";
    },
  });

  const handleLogout = () => {
    signOut();
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com botão de logout */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Dashboard - Maravilhosa Pesca
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Olá, {session.user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bem-vindo ao Dashboard!
            </h2>
            <p className="text-gray-600 mb-6">
              Você está logado como: <strong>{session.user?.email}</strong>
            </p>

            {/* Ações rápidas */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="/produtos"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Cadastro de Produtos
              </a>
              <a
                href="/estoque"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Movimentação de Estoque
              </a>
              <a
                href="/clientes"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Clientes
              </a>
              <a
                href="/promocoes"
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Promoções
              </a>
              <a
                href="/vendas"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Vendas
              </a>
              <a
                href="/pedidos"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Pedidos
              </a>
              <a
                href="/entregas"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Entregas
              </a>
            </div>
            {/* Cards de exemplo para o dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Vendas do Dia
                </h3>
                {vendas.isLoading ? (
                  <p className="text-2xl font-bold text-blue-600">...</p>
                ) : vendas.error ? (
                  <p className="text-red-500">Erro</p>
                ) : (
                  <p className="text-2xl font-bold text-blue-600">
                    R${" "}
                    {vendas.data && vendas.data.length > 0
                      ? (vendas.data as Venda[])
                          .reduce((acc, v) => acc + (v.valor || 0), 0)
                          .toLocaleString("pt-BR", { minimumFractionDigits: 2 })
                      : "0,00"}
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-300 rounded-xl p-5 shadow flex flex-col justify-between group relative overflow-hidden">
                <div className="flex items-center mb-2">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 bg-green-200 rounded-full mr-3 animate-bounce"
                    title="Produtos cadastrados"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6 text-green-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    Produtos Cadastrados
                    {produtos.data && produtos.data.length > 0 && (
                      <span
                        className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full animate-fade-in"
                        title="Novos produtos cadastrados"
                      >
                        +{produtos.data.length}
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-green-700 text-sm mb-2">
                  Total de produtos ativos cadastrados no sistema.
                  <span
                    className="ml-2 text-green-500 cursor-help"
                    title="Inclui apenas produtos ativos"
                  >
                    ⓘ
                  </span>
                </p>
                {produtos.isLoading ? (
                  <p className="text-3xl font-extrabold text-green-600 animate-pulse">
                    ...
                  </p>
                ) : produtos.error ? (
                  <p className="text-red-500">Erro ao carregar</p>
                ) : (
                  <p className="text-3xl font-extrabold text-green-700 transition-transform duration-300 ">
                    {produtos.data?.length ?? 0}
                  </p>
                )}
                <a
                  href="/produtos"
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 self-end shadow group-hover:scale-105 group-active:scale-95"
                  title="Ver todos os produtos cadastrados"
                >
                  Ver produtos
                </a>
                {/* Microinteração: efeito de brilho ao passar o mouse */}
                <span className="absolute inset-0 pointer-events-none "></span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Pedidos Pendentes
                </h3>
                {pedidos.isLoading ? (
                  <p className="text-2xl font-bold text-yellow-600">...</p>
                ) : pedidos.error ? (
                  <p className="text-red-500">Erro</p>
                ) : (
                  <p className="text-2xl font-bold text-yellow-600">
                    {pedidos.data?.length ?? 0}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
