# Configuration Files

`@mfaith/create` supports a `mfaith-create.config.ts` configuration file per [Bingo > Configuration](https://www.create.bingo/configuration).
Bingo configuration files are generally used for describing complex options that can't be inferred from existing repositories.
`@mfaith/create` is built on the [Stratum engine](https:://create.bingo/engines/stratum/about), so its configuration files adhere to [Bingo > Stratum > Details > Configurations](https://www.create.bingo/engines/stratum/details/configurations):

- [`options`](#options): any type-safe options the template has declared
- [`refinements`](#refinements): any customizations specified by the template

> [!TIP]
> `@mfaith/create` defaults `options` to their values in an existing repository.
> You most likely only need to use `refinements` to specify changes that can't be inferred.

## `options`

Any type-safe options the template has declared.
This includes the options described in [CLI](./CLI.md).

Some of `@mfaith/create`'s options are rich objects, typically very long strings, or otherwise not reasonable on the CLI.
These options are generally only programmatically used internally, but can still be specified in a configuration file:

| Option              | Description                                                              | Default (If Available)                                    |
| ------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| `contributors`      | AllContributors contributors to store in `.all-contributorsrc`           | Existing contributors in the file, or just your username  |
| `documentation`     | additional docs to add to `.github/DEVELOPMENT.md` and/or `README.md`    | Extra content in those two files                          |
| `existingLabels`    | existing labels to switch to the standard template labels                | Existing labels on the repository from the GitHub API     |
| `guide`             | link to a contribution guide to place at the top of development docs     | Block quote on top of `.github/DEVELOPMENT.md`            |
| `logo`              | local image file and alt text to display near the top of the `README.md` | First non-badge image's `alt` and `src` in `README.md`    |
| `node`              | Node.js engine version(s) to pin and require a minimum of                | Values from `.nvmrc` and `package.json`'s `"engines"`     |
| `packageData`       | additional properties to include in `package.json`                       | Existing values in `package.json`                         |
| `rulesetId`         | GitHub branch ruleset ID for main branch protections                     | Existing ruleset on the `main` branch from the GitHub API |
| `workflowsVersions` | existing versions of GitHub Actions workflows used                       | Existing action versions in `.github/workflows/*.yaml`    |

For example, changing `node` versions to values different from what would be inferred:

```ts
// mfaith-create.config.ts
import { type Config, createConfig } from '@mfaith/create';

const config: Config = createConfig({
  options: {
    node: {
      supported: '>=20.19.0',
      pinned: '22.14.0',
    },
  },
});

export default config;
```

> [!TIP]
> Running `pnpm create @mfaith` will apply any new `options` values to the repository.
> You can generally remove `options` from your configuration file after running `pnpm create @mfaith`.

## `refinements`

[Refinements](https://www.create.bingo/engines/stratum/details/configurations#refinements) can be used to modify the "Blocks" of tooling provided by `@mfaith/create`.

See [Blocks.md](./Blocks.md) for the list of blocks, which presets contain them, and their corresponding `--exclude-*` flags.

### `addons`

Any additional [Addons](https://www.create.bingo/engines/stratum/concepts/blocks#addons) provided to Blocks provided by the selected Preset.

For example, this configuration file adds the word `"michaelfaith"` to the CSpell Block's Addons:

```ts
// mfaith-create.config.ts
import { blockCspell, type Config, createConfig } from '@mfaith/create';

const config: Config = createConfig({
  refinements: {
    addons: [
      blockCspell({
        words: ['michaelfaith'],
      }),
    ],
  },
});

export default config;
```

Running `pnpm create @mfaith` in a repository with that configuration file would add `"michaelfaith"` to the `words` in `cspell.json`.

### `blocks`

Any customizations to the Blocks provided by the selected Preset.

#### `add`

Any Blocks to add to what the Preset provides.

For example, this configuration file adds in `@mfaith/create`'s provided "arethetypeswrong" Block:

```ts
// mfaith-create.config.ts
import {
  blockAreTheTypesWrong,
  type Config,
  createConfig,
} from '@mfaith/create';

const config: Config = createConfig({
  refinements: {
    blocks: {
      add: [blockAreTheTypesWrong],
    },
  },
});

export default config;
```

Running `pnpm create @mfaith` in a repository with that configuration file would add in the created outputs from `blockAreTheTypesWrong`.

#### `exclude`

Any Blocks to exclude from what the Preset provides.

For example, this configuration file omits the default _"This package was templated with..."_ notice that comes with `@mfaith/create`:

```ts
// mfaith-create.config.ts
import { blockTemplatedBy, type Config, createConfig } from '@mfaith/create';

const config: Config = createConfig({
  refinements: {
    blocks: {
      exclude: [blockTemplatedBy],
    },
  },
});

export default config;
```

Running `pnpm create @mfaith` in a repository with that configuration file would not include that Block, and so its generated README.md would not include the notice.

#### Custom Blocks and Addons

Custom Blocks can provide Addons to any other Blocks, including those provided by the package.
This allows your repositories to blend in seamlessly with the features provided by your Template.

For example, to add an [`@arethetypeswrong/cli`](https://www.npmjs.com/package/@arethetypeswrong/cli) lint task to the `package.json` file, a repository using the `@mfaith/create` Template could create and use a custom Block:

```ts
// blockLintAreTheTypesWrong.js
import { base, blockPackageJson } from '@mfaith/create';

export const blockLintAreTheTypesWrong = base.createBlock({
  about: {
    name: 'Lint Are The Types Wrong',
  },
  produce() {
    return {
      addons: [
        blockPackageJson({
          properties: {
            devDependencies: {
              '@arethetypeswrong/cli': '0.17.3',
            },
            scripts: {
              'lint:arethetypeswrong': 'attw --pack .',
            },
          },
        }),
      ],
    };
  },
});
```

```ts
// mfaith-create.config.ts
import { type Config, createConfig } from '@mfaith/create';

import { blockLintAreTheTypesWrong } from './blockLintAreTheTypesWrong.ts';

const config: Config = createConfig({
  refinements: {
    blocks: {
      add: [blockLintAreTheTypesWrong],
    },
  },
});

export default config;
```
