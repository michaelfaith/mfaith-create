import type { BaseOptions } from '../base.ts';

export interface TestOptions extends BaseOptions {
  preset: string;
}

export const optionsBase: TestOptions = {
  access: 'public',
  contact: {
    email: 'github@email.com',
    url: 'http://contact.url',
  },
  description: 'Test description',
  devExports: false,
  directory: '.',
  documentation: {
    readme: {
      usage: 'Test usage.',
    },
  },
  emoji: '✨',
  node: {
    supported: '^24.15.0 || >=26.0.0',
    pinned: '24.19.0',
  },
  owner: 'test-owner',
  packageName: 'test-package-name',
  preset: 'minimal',
  repository: 'test-repository',
  title: 'Test Title',
};
