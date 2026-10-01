import sortKeys from 'sort-keys';
import { z } from 'zod';

import { base } from '../base.ts';
import type { BlockWithProps } from './Block.ts';
import { blockDevelopmentDocs } from './blockDevelopmentDocs.ts';

const debuggerSchema: z.ZodType<Debugger> = z.intersection(
  z.record(z.string(), z.unknown()),
  z.object({ name: z.string() }),
);
export type Debugger = Record<string, unknown> & {
  name: string;
};

const taskSchema: z.ZodType<Task> = z.intersection(
  z.object({ detail: z.string() }),
  z.record(z.string(), z.unknown()),
);
export type Task = Record<string, unknown> & {
  detail: string;
};

export interface BlockVscodeProps {
  debuggers?: Debugger[] | undefined;
  extensions?: string[] | undefined;
  settings?: Record<string, unknown>;
  tasks?: Task[] | undefined;
}

export const blockVscode: BlockWithProps<BlockVscodeProps> = base.createBlock({
  about: {
    name: 'VS Code',
  },
  addons: {
    debuggers: z.array(debuggerSchema).optional(),
    extensions: z.array(z.string()).optional(),
    settings: z.record(z.string(), z.unknown()).default({}),
    tasks: z.array(taskSchema).optional(),
  },
  produce({ addons }) {
    const { debuggers, extensions, settings, tasks } = addons;

    return {
      addons: [
        blockDevelopmentDocs({
          hints: [
            `> This repository includes a list of suggested VS Code extensions.`,
            `> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.`,
          ],
          sections: {
            Testing: {
              innerSections: [
                {
                  contents: `
This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
`,
                  heading: 'Debugging Tests',
                },
              ],
            },
          },
        }),
      ],
      files: {
        '.vscode': {
          'extensions.json': extensions?.length
            ? JSON.stringify({
                recommendations: [...extensions].sort(),
              })
            : undefined,
          'launch.json': debuggers?.length
            ? JSON.stringify({
                configurations: [...debuggers].sort((a, b) => a.name.localeCompare(b.name)),
                version: '0.2.0',
              })
            : undefined,
          'settings.json': JSON.stringify(
            sortKeys({
              'editor.formatOnSave': true,
              'editor.rulers': [100],
              ...settings,
            }),
          ),
          'tasks.json': tasks?.length
            ? JSON.stringify(
                {
                  tasks: tasks.sort((a, b) => a.detail.localeCompare(b.detail)),
                  version: '2.0.0',
                },
                null,
                2,
              )
            : undefined,
        },
      },
    };
  },
});
