import { describe, expect, it } from 'vitest';

import { intakeActionInput } from './intakeActionInput.ts';

describe(intakeActionInput, () => {
  it('returns undefined when the action file does not exist', () => {
    const actual = intakeActionInput({}, ['action.yaml'], 'node-version');

    expect(actual).toBeUndefined();
  });

  it('returns undefined when the action file has invalid YAML', () => {
    const actual = intakeActionInput(
      {
        'action.yaml': ['{'],
      },
      ['action.yaml'],
      'node-version',
    );

    expect(actual).toBeUndefined();
  });

  it('returns undefined when the action file has no inputs', () => {
    const actual = intakeActionInput(
      {
        'action.yaml': ['name: Setup Node'],
      },
      ['action.yaml'],
      'node-version',
    );

    expect(actual).toBeUndefined();
  });

  it('returns undefined when the requested input does not exist', () => {
    const actual = intakeActionInput(
      {
        'action.yaml': [
          `inputs:
  other-input:
    default: 20
`,
        ],
      },
      ['action.yaml'],
      'node-version',
    );

    expect(actual).toBeUndefined();
  });

  it.each([null, 'invalid', 123, true])(
    'returns undefined when the requested input is %j',
    (inputValue) => {
      const actual = intakeActionInput(
        {
          'action.yaml': [
            `inputs:
  node-version: ${JSON.stringify(inputValue)}
`,
          ],
        },
        ['action.yaml'],
        'node-version',
      );

      expect(actual).toBeUndefined();
    },
  );

  it('returns the requested input from a nested action file', () => {
    const actual = intakeActionInput(
      {
        '.github': {
          actions: {
            setup: {
              'action.yml': [
                `inputs:
  node-version:
    description: Node.js version
    default: 22
    required: true
    type: string
`,
              ],
            },
          },
        },
      },
      ['.github', 'actions', 'setup', 'action.yaml'],
      'node-version',
    );

    expect(actual).toEqual({
      default: 22,
      description: 'Node.js version',
      required: true,
      type: 'string',
    });
  });

  it('returns an empty input object', () => {
    const actual = intakeActionInput(
      {
        'action.yaml': [
          `inputs:
  node-version: {}
`,
        ],
      },
      ['action.yaml'],
      'node-version',
    );

    expect(actual).toEqual({});
  });
});
