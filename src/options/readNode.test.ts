import { describe, expect, it, vi } from 'vitest';

import { defaults } from '../constants.ts';
import { readNode } from './readNode.ts';

describe(readNode, () => {
  describe('supported', () => {
    const getNvmrc = vi.fn();

    it('defaults to the default supported when engines.node does not exist', async () => {
      const { supported } = await readNode(getNvmrc, () =>
        Promise.resolve({ engines: {} }),
      );

      expect(supported).toBe(defaults.node.supported);
    });

    it('defaults to the default supported when engines.node does not contain a valid value', async () => {
      const { supported } = await readNode(getNvmrc, () =>
        Promise.resolve({
          engines: {
            node: 'invalid',
          },
        }),
      );

      expect(supported).toBe(defaults.node.supported);
    });

    it('uses the engines value when engines.node contains a valid value', async () => {
      const node = '^22.13.0 || ^24.11.0 || >=26.0.0';

      const { supported } = await readNode(getNvmrc, () =>
        Promise.resolve({
          engines: { node },
        }),
      );

      expect(supported).toBe(node);
    });
  });

  describe('pinned', () => {
    const getPackageDataFull = vi.fn().mockResolvedValue({});

    it('defaults to the default pinned when nvmrc does not exist', async () => {
      const { pinned } = await readNode(
        () => Promise.resolve(new Error('')),
        getPackageDataFull,
      );

      expect(pinned).toBe(defaults.node.pinned);
    });

    it('defaults to the default pinned when nvmrc does not contain text', async () => {
      const { pinned } = await readNode(
        () => Promise.resolve('\n'),
        getPackageDataFull,
      );

      expect(pinned).toBe(defaults.node.pinned);
    });

    it('uses the trimmed nvmrc text value when nvmrc contains text', async () => {
      const nvmrc = '23.4.5';

      const { pinned } = await readNode(
        () => Promise.resolve(`${nvmrc}\n`),
        getPackageDataFull,
      );

      expect(pinned).toBe(nvmrc);
    });
  });
});
