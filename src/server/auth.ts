import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import OAuthProvider from "next-auth/providers/oauth";
import { type ReactNode } from "react";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      [x: string]: ReactNode;
      id: string;
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
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        name: user.name,
        image: user.image,
        email: user.email,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // {
    //   id: "vesl",
    //   name: "Vesl",
    //   type: "oauth",
    //   authorization: "https://app.vesl.gg/version-test/api/1.1/oauth/authorize",
    //   token: "https://app.vesl.gg/version-test/api/1.1/oauth/access_token",
    //   userinfo: "https://app.vesl.gg/version-test/api/1.1/obj/user",
    //   // "https://app.vesl.gg/version-test/api/1.1/obj/user?constraints=[{'key':'Username','onstraint_type':'equals','value':'StarLord'}]",
    //   clientId: env.VESL_CLIENT_ID,
    //   clientSecret: env.VESL_CLIENT_SECRET,

    //   profile: (profile) => {
    //     console.log("profile", profile);
    //     return {
    //       id: profile.id,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.image,
    //     };
    //   },
    // },

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
  console.log("authOptions", authOptions);
  return getServerSession(ctx.req, ctx.res, authOptions);
};
