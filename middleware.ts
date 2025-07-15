import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` aprimora sua `Request` com o token do usuário.
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Se o usuário não estiver logado e tentar acessar qualquer rota protegida
    if (!token && pathname.startsWith("/dashboard")) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Permite acesso à página de login sempre
        if (req.nextUrl.pathname === "/login") return true;
        // Para outras rotas protegidas, requer token
        return !!token;
      },
    },
  }
);

// Aplica o middleware apenas às rotas protegidas
export const config = {
  matcher: ["/dashboard/:path*"],
};
