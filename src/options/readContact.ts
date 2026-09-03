import { PackageAuthor } from "./readPackageAuthor.js";

export async function readContact(
	getContactFromCodeOfConduct: () => Promise<
		undefined | { bluesky?: string; email?: string; url?: string }
	>,
	getEmailFromGit: () => Promise<string | undefined>,
	getEmailFromNpm: () => Promise<string | undefined>,
	getPackageAuthor: () => Promise<PackageAuthor>,
): Promise<undefined | { bluesky?: string; email?: string; url?: string }> {
	const contactFromCodeOfConduct = await getContactFromCodeOfConduct();
	const emailFromGit = await getEmailFromGit();
	const emailFromNpm = await getEmailFromNpm();
	const packageAuthor = await getPackageAuthor();

	const bluesky = contactFromCodeOfConduct?.bluesky || undefined;

	const email =
		packageAuthor.email ||
		contactFromCodeOfConduct?.email ||
		emailFromGit ||
		emailFromNpm;

	const url = packageAuthor.url || contactFromCodeOfConduct?.url;

	return bluesky || email || url ? { bluesky, email, url } : undefined;
}
