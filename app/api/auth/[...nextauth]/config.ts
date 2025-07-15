import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Tentativa de autorização com:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciais inválidas");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log("Usuário encontrado:", user ? "Sim" : "Não");

        if (!user || !user.password) {
          console.log("Usuário não encontrado ou sem senha");
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Senha válida:", isValid);

        if (!isValid) {
          console.log("Senha inválida");
          return null;
        }

        console.log("Login autorizado para:", user.email);
        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          name: session.user?.name ?? null,
          email: token.email as string,
          image: session.user?.image ?? null,
        };
        // @ts-expect-error: Adding custom id property to session.user for app usage
        session.user.id = token.id;
      }
      return session;
    },
  },
};
