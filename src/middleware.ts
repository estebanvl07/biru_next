// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Personaliza tu lógica de middleware si es necesario
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Se considera autorizado si el token existe
    },
  },
);

export const config = {
  matcher: ["/account/:path*", "/setting"], // Protege todas las rutas bajo /protected
};
