"use client";
import type { ActionItemProps } from "./index";
import Link from "next/link";

export function ActionButton({ icon, onClick, href }: ActionItemProps) {
  return (
    <div className="clickarea flex items-center justify-center rounded-lg hover:bg-gray-100">
      {href ? (
        <Link href={href} className="flex items-center justify-center ">
          {icon}
        </Link>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className="flex h-10 w-10 items-center justify-center "
        >
          {icon}
        </button>
      )}
    </div>
  );
}
