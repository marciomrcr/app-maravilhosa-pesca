import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const promocoes = await prisma.promocao.findMany();
  return NextResponse.json(promocoes);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (
    !body.produtoId ||
    typeof body.diaSemana !== "number" ||
    typeof body.precoPromocional !== "number"
  ) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }
  const promocao = await prisma.promocao.create({
    data: {
      produtoId: body.produtoId,
      diaSemana: body.diaSemana,
      precoPromocional: body.precoPromocional,
    },
  });
  return NextResponse.json(promocao);
}
