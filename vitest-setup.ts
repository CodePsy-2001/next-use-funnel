import { vi, beforeAll } from "vitest";

beforeAll(() => {
  vi.mock("next/router", () => import("next-router-mock"));
  vi.mock("next/navigation", () => import("./mock/next-navigation"));
});
