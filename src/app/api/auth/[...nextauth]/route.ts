import { BASE_URL } from "@/constants/BASE_URL";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "register",
      name: "register",
      credentials: {
        email: { label: "email", type: "email" },
        name: { label: "name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        if (!credentials?.email || !credentials?.password || !credentials?.name)
          return null;

        const res = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        });
        if (!res.ok) {
          const resBody = await res.text();
          throw new Error(resBody);
        }
        const user = await res.json();
        return user;
      },
    }),
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        if (!res.ok) {
          const resBody = await res.text();
          throw new Error(resBody);
        }
        const user = await res.json();
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },

    async session({ session, token }) {
      try {
        const res = await fetch(`${BASE_URL}/users/current`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        data.token = token.token;
        session.user = data;
      } catch (error) {
        session.error = "invalid-version";
      }

      return session;
    },
  },
  events: {
    signOut({ token }) {
      fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
