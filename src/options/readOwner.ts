import type { TakeInput } from "bingo";
import type { GitUrl } from "git-url-parse";

import { inputFromScript } from "input-from-script";

import type { PackageAuthor } from "./readPackageAuthor.js";

export async function readOwner(
  take: TakeInput,
  getGitDefaults: () => Promise<GitUrl | undefined>,
  getPackageAuthor: () => Promise<PackageAuthor>,
) {
  return (
    (await getGitDefaults())?.organization ??
    (
      await take(inputFromScript, {
        command: "gh config get user -h github.com",
      })
    ).stdout?.toString() ??
    (await getPackageAuthor()).name
  );
}
