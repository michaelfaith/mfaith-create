import { type AnyShape, createInput, type InputWithArgs } from 'bingo';
import { z } from 'zod';

export interface InputFromDirectoryArgs extends AnyShape {
  directoryPath: z.ZodString;
}

export const inputFromDirectory: InputWithArgs<
  Promise<string[]>,
  InputFromDirectoryArgs
> = createInput({
  args: {
    directoryPath: z.string(),
  },
  async produce({ args, fs }) {
    return await fs.readDirectory(args.directoryPath);
  },
});
