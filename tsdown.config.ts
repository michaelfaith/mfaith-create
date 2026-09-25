import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  entry: ['src/index.ts', 'src/bin/index.ts'],
  exports: { devExports: true, exclude: ['bin/index'] },
});

export default config;
