import memoryRouter, { useRouter as useR } from "next-router-mock";
import { vi } from "vitest";

export const useRouter = useR;
export const usePathname = vi.fn().mockImplementation(() => memoryRouter.pathname);
export const notFound = vi.fn();
export const redirect = vi.fn().mockImplementation((url: string) => {
  memoryRouter.setCurrentUrl(url);
});
export const useSearchParams = (): URLSearchParams =>
  Object.entries(memoryRouter.query).reduce((acc, [key, value]) => {
    if (value == null) return acc;
    if (Array.isArray(value)) value.forEach((v) => acc.append(key, v));
    else acc.append(key, value);
    return acc;
  }, new URLSearchParams());
