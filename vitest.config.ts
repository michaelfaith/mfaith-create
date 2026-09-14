import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ['src'],
      reporter: ['html', 'lcov'],
    },
    exclude: ['dist', 'node_modules'],
    maxWorkers:
      Boolean(process.env.CI) && process.platform === 'win32' ? 2 : undefined,
    setupFiles: ['console-fail-test/setup'],
  },
});
