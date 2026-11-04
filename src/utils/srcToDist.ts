const jsExtensionRegex = /(.*)\.[cm]?js$/i;
const tsExtensionRegex = /(.*)\.[cm]?ts$/i;

export const distToSrc = (value: string): string =>
  value.replace('dist', 'src').replace(jsExtensionRegex, '$1.ts');

export const srcToDist = (value: string): string =>
  value.replace('src', 'dist').replace(tsExtensionRegex, '$1.mjs');
