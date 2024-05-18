import react from "@vitejs/plugin-react-swc";
import path from 'path'
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~~': path.resolve(__dirname, './src'),
    },
  },
  plugins: [tsconfigPaths(), react()],
})
