import { testBlock } from 'bingo-stratum-testers';
import { describe, expect, test } from 'vitest';

import { blockVscode } from './blockVscode.ts';
import { optionsBase } from './options.fakes.ts';

describe(blockVscode, () => {
  test('without addons', () => {
    const creation = testBlock(blockVscode, {
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "hints": [
                "> This repository includes a list of suggested VS Code extensions.",
                "> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.",
              ],
              "sections": {
                "Testing": {
                  "innerSections": [
                    {
                      "contents": "
      This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
      To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
      ",
                      "heading": "Debugging Tests",
                    },
                  ],
                },
              },
            },
            "block": "[Block Development Docs]",
          },
        ],
        "files": {
          ".vscode": {
            "extensions.json": undefined,
            "launch.json": undefined,
            "settings.json": "{"editor.formatOnSave":true,"editor.rulers":[100]}",
            "tasks.json": undefined,
          },
        },
      }
    `);
  });

  test('with empty addons', () => {
    const creation = testBlock(blockVscode, {
      addons: {
        debuggers: [],
        settings: {},
        tasks: [],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "hints": [
                "> This repository includes a list of suggested VS Code extensions.",
                "> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.",
              ],
              "sections": {
                "Testing": {
                  "innerSections": [
                    {
                      "contents": "
      This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
      To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
      ",
                      "heading": "Debugging Tests",
                    },
                  ],
                },
              },
            },
            "block": "[Block Development Docs]",
          },
        ],
        "files": {
          ".vscode": {
            "extensions.json": undefined,
            "launch.json": undefined,
            "settings.json": "{"editor.formatOnSave":true,"editor.rulers":[100]}",
            "tasks.json": undefined,
          },
        },
      }
    `);
  });

  test('with full addons', () => {
    const creation = testBlock(blockVscode, {
      addons: {
        debuggers: [
          {
            name: 'other-debugger',
            other: true,
          },
          {
            name: 'fake-debugger',
            other: false,
          },
        ],
        extensions: [
          'dbaeumer.vscode-eslint',
          'streetsidesoftware.code-spell-checker',
          'esbenp.prettier-vscode',
          'webpro.vscode-knip',
          'vitest.explorer',
        ],
        settings: {
          'editor.formatOnSave': true,
        },
        tasks: [
          {
            detail: 'Test the project',
            label: 'test',
            script: 'test',
            type: 'npm',
          },
          {
            detail: 'Build the project',
            label: 'build',
            script: 'build',
            type: 'npm',
          },
        ],
      },
      options: optionsBase,
    });

    expect(creation).toMatchInlineSnapshot(`
      {
        "addons": [
          {
            "addons": {
              "hints": [
                "> This repository includes a list of suggested VS Code extensions.",
                "> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.",
              ],
              "sections": {
                "Testing": {
                  "innerSections": [
                    {
                      "contents": "
      This repository includes a [VS Code launch configuration](https://code.visualstudio.com/docs/editor/debugging) for debugging unit tests.
      To launch it, open a test file, then run _Debug Current Test File_ from the VS Code Debug panel (or press F5).
      ",
                      "heading": "Debugging Tests",
                    },
                  ],
                },
              },
            },
            "block": "[Block Development Docs]",
          },
        ],
        "files": {
          ".vscode": {
            "extensions.json": "{"recommendations":["dbaeumer.vscode-eslint","esbenp.prettier-vscode","streetsidesoftware.code-spell-checker","vitest.explorer","webpro.vscode-knip"]}",
            "launch.json": "{"configurations":[{"name":"fake-debugger","other":false},{"name":"other-debugger","other":true}],"version":"0.2.0"}",
            "settings.json": "{"editor.formatOnSave":true,"editor.rulers":[100]}",
            "tasks.json": "{
        "tasks": [
          {
            "detail": "Build the project",
            "label": "build",
            "script": "build",
            "type": "npm"
          },
          {
            "detail": "Test the project",
            "label": "test",
            "script": "test",
            "type": "npm"
          }
        ],
        "version": "2.0.0"
      }",
          },
        },
      }
    `);
  });
});
