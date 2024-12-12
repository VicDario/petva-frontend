import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "/src/components"),
      "@hooks": path.resolve(__dirname, "/src/hooks"),
      "@pages": path.resolve(__dirname, "/src/pages"),
    },
  },
});
