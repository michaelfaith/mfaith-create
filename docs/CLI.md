# CLI

`@mfaith/create` supports all the flags supported by [Bingo CLI](https://www.create.bingo/cli)s.
It also provides a collection of custom flags per [Bingo CLI > Template Flags](https://www.create.bingo/cli#template-flags).

```shell
pnpm create @mfaith
```

## Remote Repositories

By default, `pnpm create @mfaith` creates only a local Git repository.
It will not send network requests to create a repository on GitHub.

However, if you have an `origin` remote on GitHub, `@mfaith/create` will synchronize the local repository with it.
That includes pushing the latest commits, setting repository labels, updating repository settings such as allowed merge strategies.

A `--remote` CLI flag exists as a convenience to create a remote repository on GitHub:

```shell
pnpm create @mfaith --remote
```

You can run with `--remote` when creating a new repository or transitioning an existing local Git repository.

## Required Flags

These options can only be inferred when running on an existing repository.
Each will be prompted for when creating a new repository if not explicitly provided:

| Flag            | Description                                    |
| --------------- | ---------------------------------------------- |
| `--description` | 'Sentence case.' description of the repository |
| `--directory`   | which directory and repository name to use     |
| `--preset`      | starting set of tooling to use                 |

`pnpm create @mfaith` provides three `--preset` options:

1. **Minimal**: Just bare starter tooling: building, formatting, linting, and type checking.
2. **Common**: Bare starters plus testing and automation for all-contributors and releases.
3. **Everything**: The most comprehensive tooling imaginable: sorting, spellchecking, and more!

For example, to create a new repository with the _Everything_ preset and prompt for `description` and `directory`:

```shell
pnpm create @mfaith --preset everything
```

Pre-populating all required base options:

```shell
pnpm create @mfaith --directory my-app --description "My app! ✨" --preset everything
```

See [Bingo > Stratum > Concepts > Templates > `--preset`](https://www.create.bingo/engines/stratum/concepts/templates#--preset) for more details on presets.

## Optional Flags

The following flags may be provided on the CLI to customize their values.
Each defaults to a value based on the running system, including an repository if transitioning one.

| Flag            | Type       | Description                                                                                                         | Default                                                                                        |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `--access`      | `string`   | Which [`npm publish --access`](https://docs.npmjs.com/cli/commands/npm-publish#access) to release npm packages with | `"public"`                                                                                     |
| `--author`      | `string`   | Username on npm to publish packages under                                                                           | An existing npm author, or the currently logged in npm user, or `owner.toLowerCase()`          |
| `--authorUrl`   | `string`   | URL to the author's homepage or profile                                                                             | _(none)_                                                                                       |
| `--bin`         | `string`   | Value to set in `package.json`'s `"bin"` property                                                                   | _(none)_                                                                                       |
| `--contact`     | `string`   | Email address to be listed as the point of contact in docs and packages (e.g. `example@joshuakgoldberg.com`)        | Yours from `gh`, `git config`, or `npm whoami`                                                 |
| `--emoji`       | `string`   | decorative emoji to use in descriptions and docs                                                                    | The last emoji from `description`, or `"✨"`                                                   |
| `--funding`     | `string`   | GitHub organization or username to mention in `funding.yaml`                                                        | The same as `owner`                                                                            |
| `--keywords`    | `string[]` | Any number of keywords to include in `package.json`                                                                 | _(none)_                                                                                       |
| `--owner`       | `string`   | Organization or user owning the repository                                                                          | Yours from `gh` or `git config`                                                                |
| `--packageName` | `string`   | name of the package to publish to npm                                                                               | Existing name in `package.json` if it exists                                                   |
| `--pnpm`        | `string`   | pnpm version for `package.json`'s `packageManager` field                                                            | Existing value in `package.json` if it exists                                                  |
| `--repository`  | `string`   | Name for the new repository                                                                                         | The same as `--directory`                                                                      |
| `--title`       | `string`   | 'Title Case' title for the repository                                                                               | Title-cased `repository`                                                                       |
| `--type`        | `string`   | package.json modules type                                                                                           | Existing value in `package.json` if it exists, or `"module"`                                   |
| `--version`     | `string`   | package version to publish as and store in `package.json`                                                           | Existing value in `package.json` if it exists, or `"0.0.0"`                                    |
| `--words`       | `string[]` | additional words to add to the CSpell dictionary                                                                    | Existing `words` in a `cspell.json` file if it exists, and any new words in from other options |

For example, customizing the npm author and funding source to different values than what would be inferred:

```shell
pnpm create @mfaith --author my-npm-username --funding MyGitHubOrganization
```

Array flags can be specified as multiple times.
For example, customizing keywords to two:

```shell
pnpm create @mfaith --keywords eslint --keywords typescript
```

## Block Exclusion Flags

Per [Bingo > Stratum > Concepts > Templates > Exclusion Options](https://www.create.bingo/engines/stratum/concepts/templates#exclusion-options), individual "Blocks" of tooling may be excluded from running.
Each Block may be excluded with a CLI flag whose name matches `--exclude-*`.

For example, initializing with all tooling except for Renovate:

```shell
pnpm create @mfaith --exclude-renovate
```

See [Blocks.md](./Blocks.md) for the list of blocks, which presets contain them, and their corresponding `--exclude-*` flags.
