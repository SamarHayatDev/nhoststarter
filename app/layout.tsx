import type { Metadata } from "next";
import NhostProviderContext from "@/providers/NhostProviderContext";
import ApolloProviderContext from "@/providers/ApolloProviderContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NhostProviderContext>
          <ApolloProviderContext>{children}</ApolloProviderContext>
        </NhostProviderContext>
      </body>
    </html>
  );
}
