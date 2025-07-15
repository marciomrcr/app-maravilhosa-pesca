import type { Prisma } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  const produtos = await prisma.produto.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });
  // Serializa datas para string ISO
  const serializados = produtos.map((p) => ({
    ...p,
    createdAt:
      p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    updatedAt:
      p.updatedAt instanceof Date ? p.updatedAt.toISOString() : p.updatedAt,
    deletedAt:
      p.deletedAt instanceof Date ? p.deletedAt.toISOString() : p.deletedAt,
  }));
  return NextResponse.json(serializados);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const produtoSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    descricao: z.string().optional(),
    categoria: z.string().optional(),
    unidade: z.string().optional(),
    preco: z.number().min(0),
    precoCusto: z.number().min(0).default(0),
    fornecedor: z.string().optional(),
    estoque: z.number().min(0).default(0),
    ativo: z.boolean().default(true),
  });
  const result = produtoSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  // Remove campos undefined
  // Prisma espera campos opcionais como null, não undefined
  const cleanData: Prisma.ProdutoCreateInput = {
    nome: result.data.nome,
    preco: result.data.preco,
    precoCusto: result.data.precoCusto,
    estoque: result.data.estoque,
    ativo: result.data.ativo,
    descricao: result.data.descricao ?? "",
    categoria: result.data.categoria ?? "",
    unidade: result.data.unidade ?? "",
    fornecedor: result.data.fornecedor ?? "",
  };
  const produto = await prisma.produto.create({ data: cleanData });
  return NextResponse.json(produto);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const produtoSchema = z.object({
    nome: z.string().min(1, "Nome obrigatório"),
    descricao: z.string().optional(),
    categoria: z.string().optional(),
    unidade: z.string().optional(),
    preco: z.number().min(0),
    precoCusto: z.number().min(0).default(0),
    fornecedor: z.string().optional(),
    estoque: z.number().min(0).default(0),
    ativo: z.boolean().default(true),
  });
  const { id, ...data } = body;
  const result = produtoSchema.safeParse(data);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const cleanData: Partial<Prisma.ProdutoUpdateInput> = {
    nome: result.data.nome,
    preco: result.data.preco,
    precoCusto: result.data.precoCusto,
    estoque: result.data.estoque,
    ativo: result.data.ativo,
  };
  if (result.data.descricao)
    cleanData.descricao = { set: result.data.descricao };
  if (result.data.categoria)
    cleanData.categoria = { set: result.data.categoria };
  if (result.data.unidade) cleanData.unidade = { set: result.data.unidade };
  if (result.data.fornecedor)
    cleanData.fornecedor = { set: result.data.fornecedor };
  const produto = await prisma.produto.update({
    where: { id },
    data: cleanData,
  });
  return NextResponse.json(produto);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  await prisma.produto.update({
    where: { id },
    data: { deleted: true, deletedAt: new Date() },
  });
  return NextResponse.json({ success: true });
}
