import memoryRouter, { useRouter as useR } from "next-router-mock";
import { vi } from "vitest";

export const useRouter = useR;
export const usePathname = vi.fn().mockImplementation(() => memoryRouter.pathname);
export const notFound = vi.fn();
export const redirect = vi.fn().mockImplementation((url: string) => {
  memoryRouter.setCurrentUrl(url);
});
export const useSearchParams = () => new URLSearchParams(memoryRouter.query as any);
