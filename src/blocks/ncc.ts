import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { cspell } from './cspell.ts';
import { developmentDocs } from './developmentDocs.ts';
import { eslint } from './eslint.ts';
import { githubActionsCi } from './githubActionsCi.ts';
import { oxfmt } from './oxfmt.ts';
import { packageJson } from './packageJson.ts';
import { prettier } from './prettier.ts';
export interface BlockNccProps {
  entry?: string | undefined;
}

export const blockNcc: BlockWithProps<BlockNccProps> = base.createBlock({
  about: {
    name: 'ncc',
  },
  props: {
    entry: z.string().optional(),
  },
  intake({ options }) {
    return {
      entry: options.packageData?.scripts?.['build:release']?.match(/ncc build (.+) -o dist/)?.[1],
    };
  },
  produce({ props }) {
    const { entry = 'src/index.ts' } = props;

    return {
      extensions: [
        cspell({
          ignorePaths: ['dist'],
        }),
        developmentDocs({
          sections: {
            Building: {
              contents: `
Run [TypeScript](https://typescriptlang.org) locally to type check and build source files from \`src/\` into output files in \`lib/\`:

\`\`\`shell
pnpm build
\`\`\`

Add \`--watch\` to run the builder in a watch mode that continuously cleans and recreates \`lib/\` as you save files:

\`\`\`shell
pnpm build --watch
\`\`\`
`,
              innerSections: [
                {
                  contents: `
Run [\`@vercel/ncc\`](https://github.com/vercel/ncc) to create an output \`dist/\` to be used in production.

\`\`\`shell
pnpm build:release
\`\`\`
		`,
                  heading: 'Building for Release',
                },
              ],
            },
          },
        }),
        eslint({
          ignores: ['dist'],
        }),
        githubActionsCi({
          jobs: [
            {
              name: 'Build',
              steps: [{ run: 'pnpm build' }],
            },
            {
              name: 'Build (Release)',
              steps: [{ run: 'pnpm build:release' }],
            },
          ],
        }),
        oxfmt({
          ignorePatterns: ['/dist'],
        }),
        packageJson({
          properties: {
            devDependencies: {
              '@vercel/ncc': '^0.38.3',
            },
            scripts: {
              build: 'tsc',
              'build:release': `ncc build ${entry} -o dist`,
            },
          },
        }),
        prettier({
          ignores: ['/dist'],
        }),
      ],
    };
  },
});
