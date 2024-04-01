"use client";
import type { PropsWithChildren } from "react";
import { OverlayProvider } from "@toss/use-overlay";
import { Toaster } from "react-hot-toast";

export default function ClientProvider({ children }: PropsWithChildren) {
  return (
    <>
      <OverlayProvider>
        {children}
        <Toaster />
      </OverlayProvider>
    </>
  );
}
