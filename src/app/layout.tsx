import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Provides } from "@/components/Providers/Providers";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phonebook",
  description: "Phonebook",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <Provides>
          <Header></Header>
          <Container bgColor="#e3e3e3" as="main" minW="100%">
            {children}
          </Container>
          <Footer></Footer>
        </Provides>
      </body>
    </html>
  );
}
