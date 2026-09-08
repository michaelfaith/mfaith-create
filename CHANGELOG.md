# Changelog

## [0.1.3](https://github.com/michaelfaith/mfaith-create/compare/v0.1.2...v0.1.3) (2026-09-08)


### 🚀 Features

* update repo labels to the latest mix ([#131](https://github.com/michaelfaith/mfaith-create/issues/131)) ([19c296c](https://github.com/michaelfaith/mfaith-create/commit/19c296c1ec48f30dde524a05228303f763032e57))


### 🩹 Bug Fixes

* add `package.json` and `prettier.config.ts` to cspell's `ignorePaths` ([#129](https://github.com/michaelfaith/mfaith-create/issues/129)) ([367c88a](https://github.com/michaelfaith/mfaith-create/commit/367c88aca1c769c6c57436979862958a9506607f))
* disable `n/no-unsupported-features/node-builtins` for test files and eslint config ([#127](https://github.com/michaelfaith/mfaith-create/issues/127)) ([6aa3996](https://github.com/michaelfaith/mfaith-create/commit/6aa39962b5f254f25fd8188c95494522fb73b188))

## [0.1.2](https://github.com/michaelfaith/mfaith-create/compare/v0.1.1...v0.1.2) (2026-09-07)


### 🚀 Features

* add lint rule to keep `pnpm-workspace.yaml` sorted ([#114](https://github.com/michaelfaith/mfaith-create/issues/114)) ([2b56bf1](https://github.com/michaelfaith/mfaith-create/commit/2b56bf177f9271203ee1c4c8a48ea65df341c17b))
* update codecov to v7 ([#116](https://github.com/michaelfaith/mfaith-create/issues/116)) ([514e996](https://github.com/michaelfaith/mfaith-create/commit/514e9964acebddf833435c8c3c9c68ad6ce3210a))
* use oidc for codecov-action ([#123](https://github.com/michaelfaith/mfaith-create/issues/123)) ([004dd01](https://github.com/michaelfaith/mfaith-create/commit/004dd014a2b8515d4acb19365f9fa7e6d3701654))


### 🩹 Bug Fixes

* disable `pr-branch-non-default` octoguide rule ([#122](https://github.com/michaelfaith/mfaith-create/issues/122)) ([a62ec61](https://github.com/michaelfaith/mfaith-create/commit/a62ec612b1e2ec6a353c673e3a814dce6f90de9a))
* enable patch updates for renovate ([#119](https://github.com/michaelfaith/mfaith-create/issues/119)) ([2abd076](https://github.com/michaelfaith/mfaith-create/commit/2abd076a7ebf829aec64f22f4e7573812d0bc827))
* remove the `ignoreDeps` prop from renovate config ([#117](https://github.com/michaelfaith/mfaith-create/issues/117)) ([6dff2fc](https://github.com/michaelfaith/mfaith-create/commit/6dff2fc998cc45c8e54af56216bd007023e33e0a))

## [0.1.1](https://github.com/michaelfaith/mfaith-create/compare/v0.1.0...v0.1.1) (2026-09-06)


### 🚀 Features

* remove `useTabs` from Prettier config ([#106](https://github.com/michaelfaith/mfaith-create/issues/106)) ([a0b6f4d](https://github.com/michaelfaith/mfaith-create/commit/a0b6f4d6e2fa08a302222d892903bd18a94e88a3))
* remove use of PATs ([#104](https://github.com/michaelfaith/mfaith-create/issues/104)) ([264183a](https://github.com/michaelfaith/mfaith-create/commit/264183a31098f67136cb342174cafcb97be3b892))


### 🩹 Bug Fixes

* correct the fallback default values of node minimum node support ([#107](https://github.com/michaelfaith/mfaith-create/issues/107)) ([2becb3c](https://github.com/michaelfaith/mfaith-create/commit/2becb3c20cddcd7964522b38c1724161ceaa1dc9))
* install `jiti` in the eslint block ([#109](https://github.com/michaelfaith/mfaith-create/issues/109)) ([5291c85](https://github.com/michaelfaith/mfaith-create/commit/5291c859dd9f53b58c728e878d2228c2edc48d11))
* order yaml workflows and templates correctly ([#102](https://github.com/michaelfaith/mfaith-create/issues/102)) ([784f2d5](https://github.com/michaelfaith/mfaith-create/commit/784f2d52ec52247bed1c283405b782be5e943809))
* remove `eslint.rules.customizations` property from vscode settings ([#105](https://github.com/michaelfaith/mfaith-create/issues/105)) ([c7be5e2](https://github.com/michaelfaith/mfaith-create/commit/c7be5e297f0e1541d5f226a7a4cabb0bd62b87fd))

## 0.1.0 (2026-09-06)


### ⚠ BREAKING CHANGES

* remove eslint perfectionist block ([#96](https://github.com/michaelfaith/mfaith-create/issues/96))
* drop support for node 22 ([#97](https://github.com/michaelfaith/mfaith-create/issues/97))

### 🚀 Features

* add `packageName` option ([#24](https://github.com/michaelfaith/mfaith-create/issues/24)) ([0eab196](https://github.com/michaelfaith/mfaith-create/commit/0eab19657ecd30b0f37b2c889b6f106d6e774ce1))
* add options to setup action and absorb checkout ([#98](https://github.com/michaelfaith/mfaith-create/issues/98)) ([7569fbb](https://github.com/michaelfaith/mfaith-create/commit/7569fbbf4b1aea59c49008e73ec779ed4c111ca6))
* drop support for node 22 ([#97](https://github.com/michaelfaith/mfaith-create/issues/97)) ([12504f5](https://github.com/michaelfaith/mfaith-create/commit/12504f5c22c1105b6a89c5dce21c320581230560))
* remove `release-it` block from Common preset ([#79](https://github.com/michaelfaith/mfaith-create/issues/79)) ([bfde3d7](https://github.com/michaelfaith/mfaith-create/commit/bfde3d7b3dc6a7573bedcf79b7b7a871d3333c70))
* remove `yml/sort-keys` from ESLint block ([#82](https://github.com/michaelfaith/mfaith-create/issues/82)) ([af9b038](https://github.com/michaelfaith/mfaith-create/commit/af9b0382c3016d3603085b4b18a1f6c09caec8c5))
* remove eslint perfectionist block ([#96](https://github.com/michaelfaith/mfaith-create/issues/96)) ([cc3bed0](https://github.com/michaelfaith/mfaith-create/commit/cc3bed080453d8ea469e34e2be47c015aa563da5))
* update typescript to v6 ([#75](https://github.com/michaelfaith/mfaith-create/issues/75)) ([107704f](https://github.com/michaelfaith/mfaith-create/commit/107704ff0519a914453e740e4ac05733b3342dc1))


### 🩹 Bug Fixes

* add `CHANGELOG.md` to Prettier ignore ([#86](https://github.com/michaelfaith/mfaith-create/issues/86)) ([4cdf7c4](https://github.com/michaelfaith/mfaith-create/commit/4cdf7c4240166758df05d203f52d0cb675254035))
* change Contributor Covenant block to Code of Conduct ([#25](https://github.com/michaelfaith/mfaith-create/issues/25)) ([a25c8d3](https://github.com/michaelfaith/mfaith-create/commit/a25c8d3012f57da88b80287556905d88f0a5048e))
* rename `prepare` action to `setup` ([#87](https://github.com/michaelfaith/mfaith-create/issues/87)) ([e997b24](https://github.com/michaelfaith/mfaith-create/commit/e997b24c387c020a845eb0e675be525733830e51))

## Changelog
