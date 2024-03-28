"use client";

import type { PropsWithChildren } from "react";
import { OverlayProvider } from "@toss/use-overlay";

export default function ClientProvider({ children }: PropsWithChildren) {
  return <OverlayProvider>{children}</OverlayProvider>;
}
