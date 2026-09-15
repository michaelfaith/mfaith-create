import type { NodeVersions } from './schemas.ts';

export const defaults: { node: NodeVersions } = {
  node: {
    supported: '^24.15.0 || >=26.0.0',
    pinned: '24.20.0',
  },
};
