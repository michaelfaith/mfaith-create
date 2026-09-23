import type { TakeInput } from 'bingo';
import { inputFromFile } from 'input-from-file';

import type { GuideLink } from '../Options.ts';

export async function readGuide(
  take: TakeInput,
): Promise<GuideLink | undefined> {
  const development = await take(inputFromFile, {
    filePath: '.github/DEVELOPMENT.md',
  });

  if (development instanceof Error) {
    return undefined;
  }

  const tag = /> .*guided walkthrough, see \[((?!\[).+)\]\((.+)\)/i.exec(
    development,
  );

  if (!tag) {
    return undefined;
  }

  return {
    href: tag[2],
    title: tag[1],
  };
}
