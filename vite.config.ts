import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Configure HMR to avoid CSP issues with eval
    hmr: {
      protocol: 'ws',
    },
  },
  build: {
    // Use safer build options to avoid eval in production
    target: 'esnext',
    minify: 'esbuild',
    // Security: Don't expose source maps in production
    sourcemap: false,
    // Security: Enable rollup options for better security
    rollupOptions: {
      output: {
        // Don't expose internal module structure
        manualChunks: undefined,
      },
    },
  },
})
