#!/usr/bin/env node
import { runTemplateCLI } from 'bingo';

import { template } from '../template.ts';

// @ts-expect-error -- https://github.com/bingo-js/bingo/issues/585
process.exitCode = await runTemplateCLI(template);
