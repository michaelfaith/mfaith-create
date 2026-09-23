import type { TakeInput } from 'bingo';
import { inputFromFile } from 'input-from-file';

import { swallowError } from '../utils/swallowError.ts';

export async function readFunding(
  take: TakeInput,
): Promise<string | undefined> {
  return swallowError(
    await take(inputFromFile, { filePath: '.github/FUNDING.yaml' }),
  )
    ?.split(':')[1]
    ?.trim();
}
