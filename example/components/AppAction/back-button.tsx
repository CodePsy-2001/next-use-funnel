"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

export interface BackButtonProps {
  href?: string;
  /**
   * @desc back: `router.back()`
   * @desc replace: `router.replace(href)`
   * @desc push: `router.push(href)` or `link.href`
   * @desc mixed: `if(history.length) router.back(); else router.replace(href);`
   * @default "back"
   */
  mode?: "back" | "replace" | "push" | "mixed";
}

export function BackButton({ href, mode = "back" }: BackButtonProps) {
  const router = useRouter();

  if ((mode === "replace" || mode === "push" || mode === "mixed") && !href) {
    throw new Error(`BackButton: href is required when mode is ${mode}`);
  }

  const action =
    mode === "back"
      ? router.back
      : mode === "replace"
        ? () => router.replace(href!)
        : mode === "push"
          ? () => router.push(href!)
          : history.length
            ? router.back
            : () => router.replace(href!);

  return (
    <a href={href} onClick={action} className="block w-full text-gray-800">
      <ArrowLeftIcon width={24} height={24} />
    </a>
  );
}
