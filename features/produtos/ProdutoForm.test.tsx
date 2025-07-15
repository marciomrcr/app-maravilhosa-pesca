import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { ProdutoForm } from "./ProdutoForm";

describe("ProdutoForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockReset();
  });

  test("deve mostrar erro quando o campo estoque está vazio", async () => {
    render(<ProdutoForm onSubmit={mockOnSubmit} />);

    // Preencher todos os campos exceto estoque
    fireEvent.change(screen.getByPlaceholderText("Nome do produto"), {
      target: { value: "Camarão fresco" },
    });

    // Selecionar categoria
    fireEvent.change(screen.getByRole("combobox", { name: /categoria/i }), {
      target: { value: "Frutos do Mar" },
    });

    // Selecionar unidade
    fireEvent.change(screen.getByRole("combobox", { name: /unidade/i }), {
      target: { value: "kg" },
    });

    // Deixar estoque vazio propositalmente

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: /salvar produto/i }));

    // Verificar mensagem de erro para campo estoque
    await waitFor(() => {
      expect(
        screen.getByText(
          /O campo estoque é obrigatório e deve ser um número válido/i
        )
      ).toBeInTheDocument();
    });

    // Garantir que o formulário não foi enviado
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("deve mostrar erro quando o campo estoque não é um número válido", async () => {
    render(<ProdutoForm onSubmit={mockOnSubmit} />);

    // Preencher campo estoque com valor inválido (texto)
    const estoqueInput = screen.getByPlaceholderText("Mínimo 1");
    fireEvent.change(estoqueInput, { target: { value: "abc" } });

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: /salvar produto/i }));

    // Verificar que o input não permite caracteres não numéricos
    expect(estoqueInput).toHaveValue("");
  });

  test("deve enviar o formulário quando todos os campos obrigatórios estão preenchidos", async () => {
    render(<ProdutoForm onSubmit={mockOnSubmit} />);

    // Preencher todos os campos obrigatórios
    fireEvent.change(screen.getByPlaceholderText("Nome do produto"), {
      target: { value: "Camarão fresco" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /categoria/i }), {
      target: { value: "Frutos do Mar" },
    });

    fireEvent.change(screen.getByRole("combobox", { name: /unidade/i }), {
      target: { value: "kg" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mínimo 1"), {
      target: { value: "10" },
    });

    // Submeter o formulário
    fireEvent.click(screen.getByRole("button", { name: /salvar produto/i }));

    // Verificar que o formulário foi enviado com valores corretos
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          nome: "Camarão fresco",
          categoria: "Frutos do Mar",
          unidade: "kg",
          estoque: 10,
        })
      );
    });
  });
});
