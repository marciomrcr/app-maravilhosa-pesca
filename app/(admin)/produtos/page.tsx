"use client";
import { ProdutoList } from "@/features/produtos/ProdutoList";
import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Toast } from "../../../components/ui/Toast";
import {
  ProdutoForm,
  ProdutoFormValues,
} from "../../../features/produtos/ProdutoForm";
import { useCreateProduto } from "../../../features/produtos/useCreateProduto";

export default function ProdutosPage() {
  const createProduto = useCreateProduto();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (data: ProdutoFormValues) => {
    try {
      await createProduto.mutateAsync(data);
      setToast({ message: "Produto cadastrado com sucesso!", type: "success" });
      setModalOpen(false);
    } catch {
      setToast({ message: "Erro ao cadastrar produto.", type: "error" });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-amber-50 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">
              Gerenciamento de Produtos
            </h1>
            <p className="text-blue-900 mt-1">
              Cadastre, visualize e gerencie todos os produtos do seu estoque
            </p>
          </div>
          <button
            className="bg-blue-700 text-primary-700 px-4 py-2 rounded-md hover:bg-primary-50 transition-colors duration-200 flex items-center gap-2 font-medium shadow-sm"
            onClick={() => setModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Adicionar Produto
          </button>
        </div>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Novo Produto"
      >
        <ProdutoForm onSubmit={handleSubmit} />
      </Modal>

      <div className="bg-white rounded-lg shadow-md p-1">
        <ProdutoList />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
