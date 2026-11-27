import type { TakeInput } from 'bingo';
import { inputFromFileJson } from 'input-from-file-json';

import { swallowErrorAsync } from '../utils/swallowErrorAsync.ts';

export async function readWords(take: TakeInput): Promise<string[] | undefined> {
  const cspell =
    (await swallowErrorAsync(
      take(inputFromFileJson, {
        filePath: './cspell.json',
      }),
    )) || {};

  return (cspell as { words?: string[] }).words;
}
