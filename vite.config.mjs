import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => `${entryName}.${format === "es" ? "m" : ""}js`,
    },
    rollupOptions: {
      external: ["next/navigation", "react", "react-dom", "swr"],
    },
  },
  plugins: [dts()],
});
