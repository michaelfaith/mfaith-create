import { deepmerge } from 'deepmerge-ts';

import type { Extension, ExtensionRules } from './schemas.ts';

export const mergeAllExtensions = (...extensions: Extension[]): Extension[] => {
  const entries: Record<string, Extension> = {};

  for (const extension of extensions) {
    const filesKey = JSON.stringify(extension.files);

    entries[filesKey] =
      filesKey in entries
        ? mergeExtensions(entries[filesKey], extension, extension.files)
        : extension;
  }

  return Object.values(entries);
};

const mergeExtensions = (
  a: Extension,
  b: Extension,
  files: string[],
): Extension => {
  return {
    extends: Array.from(
      new Set([...(a.extends ?? []), ...(b.extends ?? [])]),
    ).sort(),
    files,
    languageOptions:
      (a.languageOptions ?? b.languageOptions) &&
      deepmerge(a.languageOptions, b.languageOptions),
    linterOptions:
      (a.linterOptions ?? b.linterOptions) &&
      deepmerge(a.linterOptions, b.linterOptions),
    plugins: (a.plugins ?? b.plugins) && deepmerge(a.plugins, b.plugins),
    rules: mergeExtensionsRules(a.rules, b.rules),
    settings: (a.settings ?? b.settings) && deepmerge(a.settings, b.settings),
  };
};

const mergeExtensionsRules = (
  a: ExtensionRules | undefined,
  b: ExtensionRules | undefined,
): ExtensionRules | undefined => {
  if (!a || !b) {
    return a ?? b;
  }

  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      return [...a, ...b];
    }

    return [...a, { entries: b }];
  }

  if (Array.isArray(b)) {
    return [...b, { entries: a }];
  }

  return { ...a, ...b };
};
