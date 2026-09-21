import { z } from 'zod';

import { base } from '../base.ts';
import { blockCspell } from './blockCspell.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';
import { blockEslint } from './blockEslint.ts';
import { blockGithubActionsCi } from './blockGithubActionsCi.ts';
import { blockPackageJson } from './blockPackageJson.ts';
import { blockPrettier } from './blockPrettier.ts';

export const blockNcc = base.createBlock({
  about: {
    name: 'ncc',
  },
  addons: {
    entry: z.string().optional(),
  },
  intake({ options }) {
    return {
      entry: options.packageData?.scripts?.['build:release']?.match(
        /ncc build (.+) -o dist/,
      )?.[1],
    };
  },
  produce({ addons }) {
    const { entry = 'src/index.ts' } = addons;

    return {
      addons: [
        blockCspell({
          ignorePaths: ['dist'],
        }),
        blockDevelopmentDocs({
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
        blockEslint({
          ignores: ['dist'],
        }),
        blockGithubActionsCi({
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
        blockPackageJson({
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
        blockPrettier({
          ignores: ['/dist'],
        }),
      ],
    };
  },
});
