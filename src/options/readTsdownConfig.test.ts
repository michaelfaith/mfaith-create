import { describe, expect, it, vi } from 'vitest';

import { readTsdownConfig } from './readTsdownConfig.ts';

describe(readTsdownConfig, () => {
  it('returns {} when reading tsdown.config.ts results in an error', async () => {
    const take = vi.fn().mockResolvedValueOnce(new Error('Oh no!'));

    const actual = await readTsdownConfig(take);

    expect(actual).toEqual({});
  });

  it('returns {} when tsdown.config.ts is empty', async () => {
    const take = vi.fn().mockResolvedValueOnce('');

    const actual = await readTsdownConfig(take);

    expect(actual).toEqual({});
  });

  it('returns file data when there is a tsdown.config.ts', async () => {
    const tsdownConfig = `import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  exports: {
    devExports: true,
  },
});

export default config;
`;
    const take = vi.fn().mockResolvedValueOnce(tsdownConfig);

    const actual = await readTsdownConfig(take);

    expect(actual).toEqual({ exports: { devExports: true } });
  });
});
