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

        const res = await fetch(
          "https://phonebook-0e5s.onrender.com/api/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
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

        const res = await fetch(
          "https://phonebook-0e5s.onrender.com/api/users/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
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
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_URL,
});

export { handler as GET, handler as POST };
