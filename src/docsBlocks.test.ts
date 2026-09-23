import * as fs from 'node:fs/promises';

import type { Block } from 'bingo-stratum';
import * as prettier from 'prettier';
import { describe, expect, test } from 'vitest';

import * as blocks from './blocks/index.ts';
import { presetCommon, presetEverything, presetMinimal } from './index.ts';

const actualLines = await createActualLines();
const expectedLines = await createExpectedLines();

// This test ensures ensures docs/Blocks.md has a row for each of @mfaith/create's blocks.
// Each row should include emojis describing which preset(s) include the block.
//
// If this fails, it's likely due to adding, removing, or renaming a block.
// You may need to manually change docs/Blocks.md to match to those changes.
//
// For example, if you add a blockExample to the Common and Everything presets,
// you'll need to add a row like:
//
// ```md
// | Example | `--add-example`, `--exclude-example` | | ✅ | 💯 |
// ```
//
// Rows are kept sorted by alphabetical order of name.
describe('docs/Blocks.md', () => {
  for (const [i, line] of expectedLines.entries()) {
    const name = line.split(' | ')[0].replace('| ', '').trim();
    if (!name) {
      continue;
    }

    test(name, () => {
      const actualLine = actualLines.find((line) => line.includes(`| ${name}`));
      const expectedLine = expectedLines[i];

      expect(actualLine).toBe(expectedLine);
    });
  }
});

async function createActualLines() {
  const actualFile = (await fs.readFile('docs/Blocks.md')).toString();

  return splitTable(actualFile);
}

async function createExpectedLines() {
  const lines = [
    '| Block | Flags | Minimal | Common | Everything |',
    '| ----- | ----- | ------- | ------ | ---------- |',
  ];

  for (const block of Object.values(blocks) as Block[]) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const name = block.about!.name!;

    lines.push(
      [
        name,
        `${createFlag('add', name)}, ${createFlag('exclude', name)}`,
        presetMinimal.blocks.includes(block) ? '✔️' : ' ',
        presetCommon.blocks.includes(block) ? '✅' : ' ',
        presetEverything.blocks.includes(block) ? '💯' : ' ',
        '',
      ].join(' | '),
    );
  }

  const expectedTable = await prettier.format(lines.join('\n'), {
    parser: 'markdown',
  });

  return splitTable(expectedTable);
}

function createFlag(prefix: string, name: string) {
  return `\`--${prefix}-${name.replaceAll(/\W+/g, '-').toLowerCase()}\``;
}

function splitTable(table: string) {
  return table
    .split('\n')
    .filter((line) => !line.includes('----'))
    .map((line) => line.toLowerCase());
}
