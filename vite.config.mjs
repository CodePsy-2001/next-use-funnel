import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      // entry: "src/*.ts",
    },
    rollupOptions: {
      // input: {
      //   index: "src/index.ts",
      //   // minusDays: "src/minusDays.ts",
      // },
      output: [
        {
          format: "esm",
          entryFileNames: "[name].mjs",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
  plugins: [dts()],
});
