"use client";
import { ProdutoList } from "@/features/produtos/ProdutoList";
import { useState } from "react";
import { Loading } from "../../../components/ui/Loading";
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
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
          onClick={() => setModalOpen(true)}
        >
          Adicionar Produto
        </button>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Novo Produto"
      >
        <ProdutoForm onSubmit={handleSubmit} />
        {createProduto.isPending && <Loading />}
      </Modal>
      <div className="mt-8">
        <ProdutoList />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
