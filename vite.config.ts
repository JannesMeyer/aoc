import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: { 'bun:test': 'vitest' },
  },
});
