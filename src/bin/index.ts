#!/usr/bin/env node
import { runTemplateCli } from 'bingo';

import { template } from '../template.ts';

process.exitCode = await runTemplateCli(template);
