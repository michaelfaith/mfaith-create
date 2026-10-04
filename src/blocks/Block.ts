import type { BlockWithAddons, BlockWithoutAddons } from 'bingo-stratum';

import type { Options } from '../Options.ts';

export type BlockWithoutProps = BlockWithoutAddons<Options>;
export type BlockWithProps<TProps extends object> = BlockWithAddons<TProps, Options>;
