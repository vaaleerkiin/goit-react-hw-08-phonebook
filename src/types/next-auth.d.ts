import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      subscription: string;
      token: string;
      avatarURL: string;
    };
    error?: string;
  }
}
