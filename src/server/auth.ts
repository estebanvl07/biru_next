import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type User,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";
import { PrismaClient } from "@prisma/client";
import { RequestError } from "~/lib/utility/errorClass";

import bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        name: { type: "text" },
        email: { label: "Correo", type: "text", placeholder: "Jhon@Doe.com" },
        password: {
          label: "Contraseña",
          type: "text",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        // console.log(credentials);

        if (!credentials) return null;

        const referer = req?.headers?.referer || "";

        if (referer.includes("/register")) {
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials?.email ?? "" },
          });

          if (existingUser) {
            throw new RequestError({
              status: 400,
              code: "USER_EXISTING",
              message: "El email ya está en uso",
            });
          }

          const newUser = await prisma.user.create({
            data: {
              email: credentials?.email,
              name: credentials?.name || null,
              image: null,
            },
          });

          await prisma.userAccount.create({
            data: {
              userId: newUser.id,
              name: "Ahorros",
              reference: "",
              balance: 0,
              state: 1,
              type: 1,
            },
          });

          // create user password
          const passwordHash = bcrypt.hashSync(
            credentials.password,
            bcrypt.genSaltSync(10),
          );

          await prisma.userPassword.create({
            data: {
              email: credentials?.email,
              password: passwordHash,
              userId: newUser.id,
              state: 1,
            },
          });

          return newUser;
        }

        const userFound = await prisma.user.findUnique({
          where: { email: credentials?.email ?? "" },
          include: {
            userPassword: true,
          },
        });

        const validate_user_error = {
          code: "INVALID_EMAIL_OR_PASSWORD",
          status: 400,
          message: "Correo o contraseña incorrecta",
        };

        if (!userFound) {
          throw new RequestError(validate_user_error);
        }

        const isPasswordMatching = await bcrypt.compare(
          credentials.password,
          userFound?.userPassword?.password ?? "",
        );

        if (!isPasswordMatching) {
          throw new RequestError(validate_user_error);
        }
        // Return null if user data could not be retrieved
        return userFound;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async session({ session, token }) {
      const options = {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };

      return options;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
