/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        await connectDB();

        const existUser = await User.findOne({ email: credentials.email });
        if (!existUser) {
          return null;
        }

        // ✅ Password + user-specific salt
        const saltedPassword = credentials.password + existUser.salt;
        const isValid = await bcrypt.compare(
          saltedPassword,
          existUser.passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: (existUser._id as unknown as { toString: () => string }).toString(),
          name: existUser.name,
          email: existUser.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      if (token?.uid) (session.user as any).id = token.uid;
      return session;
    },
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
});
