import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// const path = require("path");
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@jetstream": path.resolve("./src/jetstream"),
    },
  },
  plugins: [vue()],
});
