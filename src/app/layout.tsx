import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Provides } from "@/components/Providers/Providers";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Container } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/nextAuthConfigs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phonebook",
  description: "Phonebook",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerSession(authOptions);

  return (
    <html>
      <body className={inter.className}>
        <Provides>
          <Header serverSession={serverSession} />
          <Container bgColor="#e3e3e3" as="main" minW="100%">
            {children}
          </Container>
          <Footer></Footer>
        </Provides>
      </body>
    </html>
  );
}
