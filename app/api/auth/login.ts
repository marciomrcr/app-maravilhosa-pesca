import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response("Usuário não encontrado", { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return new Response("Senha inválida", { status: 401 });
  }
  // Aqui você pode gerar um token ou usar a sessão do better-auth
  // Exemplo: return Response com sucesso
  return new Response("Login realizado com sucesso", { status: 200 });
}

export async function DELETE() {
  // Aqui você pode invalidar a sessão/token
  return new Response("Logout realizado com sucesso", { status: 200 });
}
