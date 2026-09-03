import { TakeInput } from "bingo";
import { inputFromFile } from "input-from-file";

const blueskyRegex =
	/for enforcement on \[Bluesky\]\(https:\/\/bsky\.app\/profile\/(.+)\)\.[\r\n]+All/;
const emailRegex = /for enforcement at (.[^\n\r@\u2028\u2029]*@.+)\.[\r\n]+All/;
const urlRegex = /for enforcement at (https?:\/\/.+)\.[\r\n]+All/;

export async function readContactFromCodeOfConduct(
	take: TakeInput,
): Promise<undefined | { bluesky?: string; email?: string; url?: string }> {
	const codeOfConduct = await take(inputFromFile, {
		filePath: ".github/CODE_OF_CONDUCT.md",
	});

	if (
		typeof codeOfConduct !== "string" ||
		!codeOfConduct.includes("# Code of Conduct")
	) {
		return undefined;
	}

	const blueskyMatch = blueskyRegex.exec(codeOfConduct);
	const emailMatch = emailRegex.exec(codeOfConduct);
	const urlMatch = urlRegex.exec(codeOfConduct);

	if (!blueskyMatch && !emailMatch && !urlMatch) {
		return undefined;
	}

	return {
		bluesky: blueskyMatch?.[1],
		email: emailMatch?.[1],
		url: urlMatch?.[1],
	};
}
