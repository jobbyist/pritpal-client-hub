import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages deployment configuration
  // Use "/" as base for custom domain, "/pritpal-client-hub/" for GitHub Pages default
  base: process.env.GITHUB_PAGES_CUSTOM_DOMAIN === "true" ? "/" : 
        (process.env.NODE_ENV === "production" ? "/pritpal-client-hub/" : "/"),
  
  server: {
    host: "::",
    port: 8080,
  },
  
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Ensure proper asset handling for GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
