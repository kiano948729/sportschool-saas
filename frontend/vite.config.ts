import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "http://nginx:80",
        changeOrigin: true,
      },
      "/sanctum": {
        target: "http://nginx:80",
        changeOrigin: true,
      },
    },
  },
});
