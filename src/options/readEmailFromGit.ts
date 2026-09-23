import type { TakeInput } from 'bingo';
import { inputFromScript } from 'input-from-script';

export async function readEmailFromGit(
  take: TakeInput,
): Promise<string | undefined> {
  return (
    await take(inputFromScript, { command: 'git config --get user.email' })
  ).stdout?.toString();
}
