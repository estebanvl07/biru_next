// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // Se considera autorizado si el token existe
  },
});

export const config = {
  matcher: ["/account/:path*", "/setting"], // Protege todas las rutas bajo /protected
};
