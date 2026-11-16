import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, it } from 'vitest';

import { nvmrc } from './nvmrc.ts';
import { optionsBase } from './options.fakes.ts';
import { oxfmt } from './oxfmt.ts';
import { prettier } from './prettier.ts';

describe(nvmrc, () => {
  it('only includes blockPackageJson props when options.node.pinned does not exist', () => {
    const creation = testBlock(nvmrc, {
      options: { ...optionsBase, node: { supported: '>=24' } },
    });

    expect(creation).toEqual({
      extensions: [
        oxfmt({
          overrides: [
            {
              files: ['.nvmrc'],
              options: {
                parser: 'yaml',
              },
            },
          ],
        }),
        prettier({
          overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
        }),
      ],
    });
  });

  it('also includes files when options.node.pinned exists', () => {
    const creation = testBlock(nvmrc, {
      options: {
        ...optionsBase,
        node: { pinned: '24.3.0', supported: '>=20.19.0' },
      },
    });

    expect(creation).toEqual({
      extensions: [
        oxfmt({
          overrides: [
            {
              files: ['.nvmrc'],
              options: {
                parser: 'yaml',
              },
            },
          ],
        }),
        prettier({
          overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
        }),
      ],
      files: {
        '.nvmrc': `24.3.0\n`,
      },
    });
  });
});
