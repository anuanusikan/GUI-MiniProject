import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,          // same as 0.0.0.0
    port: 5173,
    strictPort: true,
    hmr: {
      host: "192.168.43.26", // ✅ your laptop IP
    },
  },
})