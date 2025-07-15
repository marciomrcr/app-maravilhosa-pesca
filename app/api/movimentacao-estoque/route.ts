import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const movimentacaoSchema = z.object({
  produtoId: z.string().min(1, "Produto obrigatório"),
  tipo: z.enum(["ENTRADA", "SAIDA"]),
  quantidade: z.number().min(1, "Quantidade obrigatória"),
  descricao: z.string().optional(),
  observacao: z.string().optional(),
});

export async function GET() {
  const movimentacoes = await prisma.movimentacaoEstoque.findMany({
    where: { deleted: false },
    include: { produto: true },
    orderBy: { createdAt: "desc" },
  });
  // Serializa datas para string ISO
  const serializados = movimentacoes.map((m) => ({
    ...m,
    createdAt:
      m.createdAt instanceof Date ? m.createdAt.toISOString() : m.createdAt,
    updatedAt:
      m.updatedAt instanceof Date ? m.updatedAt.toISOString() : m.updatedAt,
    deletedAt:
      m.deletedAt instanceof Date ? m.deletedAt.toISOString() : m.deletedAt,
    data: m.data instanceof Date ? m.data.toISOString() : m.data,
  }));
  return NextResponse.json(serializados);
}

export async function POST(req: Request) {
  const body = await req.json();
  const result = movimentacaoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const { produtoId, tipo, quantidade, descricao, observacao } = result.data;

  // Atualiza o estoque do produto
  const produto = await prisma.produto.findUnique({ where: { id: produtoId } });
  if (!produto) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }
  const novoEstoque =
    tipo === "ENTRADA"
      ? produto.estoque + quantidade
      : produto.estoque - quantidade;
  if (novoEstoque < 0) {
    return NextResponse.json(
      { error: "Estoque insuficiente" },
      { status: 400 }
    );
  }

  await prisma.produto.update({
    where: { id: produtoId },
    data: { estoque: novoEstoque },
  });

  const movimentacao = await prisma.movimentacaoEstoque.create({
    data: {
      produtoId,
      tipo,
      quantidade,
      descricao,
      observacao,
    },
  });
  return NextResponse.json(movimentacao);
}
