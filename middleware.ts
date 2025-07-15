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

    // Se o usuário estiver logado e tentar acessar a página de login, redirecione para o dashboard
    if (token && pathname === "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Aplica o middleware a todas as rotas, exceto as da API, etc.
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
