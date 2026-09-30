import type { BlockWithAddons } from 'bingo-stratum';
import { z } from 'zod';

import { base } from '../base.ts';
import type { Options } from '../Options.ts';
import { blockRemoveFiles } from './blockRemoveFiles.ts';

const innerSectionSchema: z.ZodType<InnerSection> = z.object({
  contents: z.string(),
  heading: z.string(),
});
export interface InnerSection {
  contents: string;
  heading: string;
}

const sectionSchema: z.ZodType<Section> = z.object({
  contents: z
    .union([
      z.string(),
      z.object({
        after: z.array(z.string()).optional(),
        before: z.string().optional(),
        items: z.array(z.string()).optional(),
        plural: z.string().optional(),
      }),
    ])
    .optional(),
  innerSections: z.array(innerSectionSchema).optional(),
});
export interface Section {
  contents?:
    | string
    | {
        after?: string[] | undefined;
        before?: string | undefined;
        items?: string[] | undefined;
        plural?: string | undefined;
      }
    | undefined;
  innerSections?: InnerSection[] | undefined;
}

function printInnerSection(innerSection: InnerSection) {
  return [`### ${innerSection.heading}`, ``, innerSection.contents];
}

function printSection(heading: string, section: Section) {
  const innerSections = section.innerSections?.flatMap(printInnerSection) ?? [];

  if (section.contents === undefined) {
    return innerSections;
  }

  const contents =
    typeof section.contents === 'string'
      ? { before: section.contents }
      : section.contents;

  return [
    `## ${heading}`,
    ``,
    ...(contents.before ? [contents.before] : []),
    ...(contents.items?.sort((a, b) =>
      a.replaceAll('`', '').localeCompare(b.replaceAll('`', '')),
    ) ?? []),
    ...(contents.items?.length && contents.plural ? [``, contents.plural] : []),
    ...(contents.after ?? []),
    ...innerSections,
  ];
}

export interface BlockDevelopmentDocsProps {
  hints: string[];
  sections: Record<string, Section>;
}

export const blockDevelopmentDocs: BlockWithAddons<
  BlockDevelopmentDocsProps,
  Options
> = base.createBlock({
  about: {
    name: 'Development Docs',
  },
  addons: {
    hints: z.array(z.string()).default([]),
    sections: z.record(z.string(), sectionSchema).default({}),
  },
  produce({ addons, options }) {
    const lines = [
      `# Development`,
      ``,
      ...(options.guide
        ? [
            `> If you'd like a more guided walkthrough, see [${options.guide.title}](${options.guide.href}).`,
            `> It'll walk you through the common activities you'll need to contribute.`,
            ``,
          ]
        : []),
      `After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):`,
      ``,
      `\`\`\`shell`,
      `git clone https://github.com/(your-name-here)/${options.repository}`,
      `cd ${options.repository}`,
      `pnpm install`,
      `\`\`\``,
      ``,
      ...(addons.hints.length ? [...addons.hints, ``] : []),
      ...Object.entries(addons.sections)
        .sort(([a], [b]) => a.localeCompare(b))
        .flatMap(([heading, section]) => printSection(heading, section)),
      ...(options.documentation.development
        ? [options.documentation.development]
        : []),
    ];

    return {
      files: {
        '.github': {
          'DEVELOPMENT.md': lines.join('\n'),
        },
      },
    };
  },
  transition() {
    return {
      addons: [blockRemoveFiles({ files: ['DEVELOPMENT.md'] })],
    };
  },
});
