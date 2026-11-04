import type { NodeVersions } from './Options.ts';

export const defaults: { node: NodeVersions } = {
  node: {
    supported: '^24.15.0 || >=26.0.0',
    pinned: '26.13.0',
  },
};
