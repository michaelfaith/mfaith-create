import { defineConfig, type ViteUserConfig } from 'vitest/config';

const config: ViteUserConfig = defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ['src'],
      reporter: ['html', 'lcov'],
    },
    exclude: ['dist', 'node_modules'],
    setupFiles: ['console-fail-test/setup'],
  },
});

export default config;
