import type {
  BlockWithoutProps as _BlockWithoutProps,
  BlockWithProps as _BlockWithProps,
} from 'bingo-stratum';

import type { Options } from '../Options.ts';

export type BlockWithoutProps = _BlockWithoutProps<Options>;
export type BlockWithProps<TProps extends object> = _BlockWithProps<TProps, Options>;
