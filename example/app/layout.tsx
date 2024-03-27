import type { PropsWithChildren } from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "분할결제 신청하기 | 캔디페이",
  description: "이제 간편결제도 카드 나눠서 결제해요",
};

export const viewport: Viewport = {
  themeColor: "#5B7EF3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

const tossFace = localFont({
  src: "../public/TossFace.ttf",
  variable: "--font-toss-face",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className={`${tossFace.variable} font-sans`}>{children}</body>
    </html>
  );
}
