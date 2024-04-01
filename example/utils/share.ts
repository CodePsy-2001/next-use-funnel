"use client";
import { toast } from "react-hot-toast";

export type StrictShareData = Omit<ShareData, "url"> & { url: URL };

/**
 * Web Share API with fallback
 */
export const share = async (data: StrictShareData) => {
  try {
    await navigator.share({ ...data, url: data.url.href });
  } catch {
    await navigator.clipboard.writeText(`${data.title} - ${data.text}\n${data.url}`);
    toast.success("공유 메시지를 복사했어요!");
  }
};
