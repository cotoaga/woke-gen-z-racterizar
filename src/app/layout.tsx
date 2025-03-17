import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "woke-gen-z-racterizar",
  description: "A dual-bot Frankenstein of woke ELIZA and cryptic Racter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>woke-gen-z-racterizar</title>
        <meta name="description" content="A dual-bot Frankenstein of woke ELIZA and cryptic Racter." />
      </head>
      <body>{children}</body>
    </html>
  );
}
