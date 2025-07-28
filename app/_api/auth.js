import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import { createGuest, getGuest } from "@/app/_api/data-service";

const providers = [
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
  Yandex({
    clientId: process.env.AUTH_YANDEX_ID,
    clientSecret: process.env.AUTH_YANDEX_SECRET,
  }),
];

export const authConfig = {
  providers,
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existGuest = await getGuest(user.email);
        if (!existGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.id = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
