import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { join } from 'node:path';
import viteReact from '@vitejs/plugin-react-swc'

// There is no type definition yet for vite-fastify
// @ts-ignore
import { viteFastify } from '@fastify/vite/plugin'

export default defineConfig(() => ({
  root: join(import.meta.dirname, 'client'),
  plugins: [tailwindcss(), viteFastify(), viteReact(), tsconfigPaths()],
  build: {
    emptyOutDir: true,
    outDir: join(import.meta.dirname, 'dist/client'),
  },
}));