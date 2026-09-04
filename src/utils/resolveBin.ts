import { fileURLToPath } from "node:url";

// TODO: try to see if we can avoid this altogether...
// https://github.com/michaelfaith/mfaith-create/issues/80
export function resolveBin(bin: string) {
	return fileURLToPath(import.meta.resolve(bin));
}
