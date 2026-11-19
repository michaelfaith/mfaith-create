#!/usr/bin/env node
import { runTemplateCLI } from 'bingo';

import { template } from '../template.ts';

process.exitCode = await runTemplateCLI(template);
