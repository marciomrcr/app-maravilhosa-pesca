import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { TipoMovimentacao } from "../app/generated/prisma";

async function main() {
  // Clientes e Endereços
  await prisma.cliente.create({
    data: {
      nome: "João Silva",
      telefone: "91999999999",
      enderecos: {
        create: [
          {
            bairro: "Guamá",
            rua: "Rua das Flores",
            numero: "123",
            taxaEntrega: 0,
            pontoReferencia: "Próximo à praça",
          },
          {
            bairro: "Marco",
            rua: "Av. Central",
            numero: "456",
            taxaEntrega: 5,
            pontoReferencia: "Em frente ao mercado",
          },
        ],
      },
    },
    include: { enderecos: true },
  });

  await prisma.cliente.create({
    data: {
      nome: "Maria Souza",
      telefone: "91988888888",
      enderecos: {
        create: [
          {
            bairro: "Guamá",
            rua: "Rua Verde",
            numero: "789",
            taxaEntrega: 0,
            pontoReferencia: "Ao lado da escola",
          },
        ],
      },
    },
    include: { enderecos: true },
  });

  // Produtos
  const pescada = await prisma.produto.create({
    data: {
      nome: "Pescada",
      categoria: "Peixe",
      unidade: "kg",
      preco: 40,
      precoCusto: 30,
      estoque: 50,
    },
  });

  const camaraoRosa = await prisma.produto.create({
    data: {
      nome: "Camarão Rosa",
      categoria: "Frutos do Mar",
      unidade: "kg",
      preco: 80,
      precoCusto: 60,
      estoque: 30,
    },
  });

  const camaraoSalgado = await prisma.produto.create({
    data: {
      nome: "Camarão Salgado",
      categoria: "Frutos do Mar",
      unidade: "kg",
      preco: 60,
      precoCusto: 45,
      estoque: 20,
    },
  });

  const caranguejo = await prisma.produto.create({
    data: {
      nome: "Caranguejo",
      categoria: "Frutos do Mar",
      unidade: "dz",
      preco: 100,
      precoCusto: 80,
      estoque: 15,
    },
  });

  // Promoções
  await prisma.promocao.createMany({
    data: [
      {
        produtoId: pescada.id,
        diaSemana: 2, // Terça
        precoPromocional: 35,
      },
      {
        produtoId: camaraoRosa.id,
        diaSemana: 3, // Quarta
        precoPromocional: 70,
      },
      {
        produtoId: camaraoSalgado.id,
        diaSemana: 4, // Quinta
        precoPromocional: 50,
      },
      {
        produtoId: caranguejo.id,
        diaSemana: 5, // Sexta
        precoPromocional: 90,
      },
    ],
  });

  // Movimentação de Estoque (entrada inicial)
  await prisma.movimentacaoEstoque.createMany({
    data: [
      {
        produtoId: pescada.id,
        tipo: TipoMovimentacao.ENTRADA,
        quantidade: 50,
        descricao: "Estoque inicial",
      },
      {
        produtoId: camaraoRosa.id,
        tipo: TipoMovimentacao.ENTRADA,
        quantidade: 30,
        descricao: "Estoque inicial",
      },
      {
        produtoId: camaraoSalgado.id,
        tipo: TipoMovimentacao.ENTRADA,
        quantidade: 20,
        descricao: "Estoque inicial",
      },
      {
        produtoId: caranguejo.id,
        tipo: TipoMovimentacao.ENTRADA,
        quantidade: 15,
        descricao: "Estoque inicial",
      },
    ],
  });

  // Usuário para teste de login
  const email = "admin@teste.com";
  const password = "123456";
  // Remove usuário existente para garantir hash correto
  await prisma.user.deleteMany({ where: { email } });
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
