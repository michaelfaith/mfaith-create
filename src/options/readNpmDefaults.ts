import type { ExecaError, Result } from 'execa';

import npmUser, { type UserInfo } from 'npm-user';

import { swallowErrorAsync } from '../utils/swallowErrorAsync.ts';

// TODO: npmUser does not go through take(input*), making it harder to test.
// https://github.com/JoshuaKGoldberg/create-typescript-app/issues/1990
export async function readNpmDefaults(
  getNpmWhoami: () => Promise<ExecaError | Result | undefined>,
): Promise<UserInfo | undefined> {
  const whoami = await getNpmWhoami();
  return typeof whoami?.stdout === 'string'
    ? await swallowErrorAsync(npmUser(whoami.stdout))
    : undefined;
}
