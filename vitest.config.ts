import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    testTimeout: 20000,
    css: false,
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
});
