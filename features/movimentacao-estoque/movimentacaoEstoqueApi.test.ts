import prisma from "@/lib/prisma";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "../../app/api/movimentacao-estoque/route";

const mockProduto = {
  id: "produto-1",
  nome: "Produto Teste",
  descricao: "Descrição Teste",
  categoria: "Categoria Teste",
  unidade: "un",
  preco: 10.0,
  precoCusto: 5.0,
  fornecedor: "Fornecedor Teste",
  estoque: 10,
  ativo: true,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  deleted: false,
  promocoes: [],
  itensPedido: [],
  movimentacoes: [],
};

type TipoMovimentacao = "ENTRADA" | "SAIDA";
const tipoEntrada: TipoMovimentacao = "ENTRADA";
const tipoSaida: TipoMovimentacao = "SAIDA";

const mockMovimentacao = {
  id: "mov-1",
  produtoId: "produto-1",
  tipo: tipoEntrada,
  quantidade: 5,
  descricao: "Reposição",
  observacao: "Compra de fornecedor",
  deleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  data: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(prisma.movimentacaoEstoque, "findMany").mockResolvedValue([]);
});

describe("MovimentacaoEstoque API", () => {
  it("deve criar movimentação de entrada e atualizar estoque", async () => {
    vi.spyOn(prisma.produto, "findUnique").mockResolvedValue({
      ...mockProduto,
    });
    vi.spyOn(prisma.produto, "update").mockResolvedValue({
      ...mockProduto,
      estoque: 15,
    });
    vi.spyOn(prisma.movimentacaoEstoque, "create").mockResolvedValue(
      mockMovimentacao
    );

    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({
        produtoId: "produto-1",
        tipo: "ENTRADA",
        quantidade: 5,
        descricao: "Reposição",
        observacao: "Compra de fornecedor",
      }),
    });

    const res = await POST(req);
    expect(res.status).not.toBe(400);
    expect(prisma.produto.update).toHaveBeenCalledWith({
      where: { id: "produto-1" },
      data: { estoque: 15 },
    });
    expect(prisma.movimentacaoEstoque.create).toHaveBeenCalled();
  });

  it("deve criar movimentação de saída e atualizar estoque", async () => {
    vi.spyOn(prisma.produto, "findUnique").mockResolvedValue({
      ...mockProduto,
    });
    vi.spyOn(prisma.produto, "update").mockResolvedValue({
      ...mockProduto,
      estoque: 7,
    });
    vi.spyOn(prisma.movimentacaoEstoque, "create").mockResolvedValue({
      ...mockMovimentacao,
      tipo: tipoSaida,
      quantidade: 3,
    });

    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({
        produtoId: "produto-1",
        tipo: "SAIDA",
        quantidade: 3,
        descricao: "Venda",
        observacao: "Venda para cliente",
      }),
    });

    const res = await POST(req);
    expect(res.status).not.toBe(400);
    expect(prisma.produto.update).toHaveBeenCalledWith({
      where: { id: "produto-1" },
      data: { estoque: 7 },
    });
    expect(prisma.movimentacaoEstoque.create).toHaveBeenCalled();
  });

  it("deve retornar erro se estoque insuficiente", async () => {
    vi.spyOn(prisma.produto, "findUnique").mockResolvedValue({
      ...mockProduto,
    });
    const req = new Request("http://localhost/api", {
      method: "POST",
      body: JSON.stringify({
        produtoId: "produto-1",
        tipo: "SAIDA",
        quantidade: 20,
        descricao: "Venda",
        observacao: "Venda para cliente",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Estoque insuficiente");
  });

  it("deve listar movimentações não deletadas", async () => {
    vi.spyOn(prisma.movimentacaoEstoque, "findMany").mockResolvedValue([
      { ...mockMovimentacao },
      { ...mockMovimentacao, id: "mov-2", tipo: tipoSaida, quantidade: 2 },
    ]);
    const res = await GET();
    expect(res.status).not.toBe(400);
    expect(prisma.movimentacaoEstoque.findMany).toHaveBeenCalledWith({
      where: { deleted: false },
      include: { produto: true },
      orderBy: { createdAt: "desc" },
    });
  });
});
