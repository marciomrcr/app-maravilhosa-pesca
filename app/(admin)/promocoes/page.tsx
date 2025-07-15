"use client";

import { Loading } from "@/components/ui/Loading";
import { Modal } from "@/components/ui/Modal";
import { Toast } from "@/components/ui/Toast";
import {
  PromocaoForm,
  PromocaoFormValues,
} from "@/features/promocoes/PromocaoForm";
import PromocaoList from "@/features/promocoes/PromocaoList";
import { useCreatePromocao } from "@/features/promocoes/useCreatePromocao";
import { useState } from "react";

export default function PromocoesPage() {
  const createPromocao = useCreatePromocao();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (data: PromocaoFormValues) => {
    try {
      await createPromocao.mutateAsync(data);
      setToast({
        message: "Promoção cadastrada com sucesso!",
        type: "success",
      });
      setModalOpen(false);
    } catch {
      setToast({ message: "Erro ao cadastrar promoção.", type: "error" });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-blue-950 font-bold">Promoções</h1>
        <button
          className="bg-primary text-blue-950 px-4 py-2 rounded hover:bg-primary/90 transition"
          onClick={() => setModalOpen(true)}
        >
          Adicionar Promoção
        </button>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nova Promoção"
      >
        <PromocaoForm onSubmit={handleSubmit} />
        {createPromocao.isPending && <Loading />}
      </Modal>
      <div className="mt-8">
        <PromocaoList />
      </div>
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
