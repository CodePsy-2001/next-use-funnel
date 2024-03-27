import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format, entry) => `${entry}.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['next/navigation', 'react', 'react-dom', 'swr'],
    },
  },
  plugins: [dts(), react()],
});