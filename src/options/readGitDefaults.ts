import type { TakeInput } from 'bingo';
import gitUrlParse, { type GitUrl } from 'git-url-parse';
import { inputFromScript } from 'input-from-script';

export async function readGitDefaults(
  take: TakeInput,
): Promise<GitUrl | undefined> {
  const url = await take(inputFromScript, {
    command: 'git remote get-url origin',
  });

  return url.stdout ? gitUrlParse(url.stdout.toString()) : undefined;
}
