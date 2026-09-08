#!/usr/bin/env node
import { runTemplateCLI } from "bingo";

import { template } from "../index.js";

// @ts-expect-error -- https://github.com/bingo-js/bingo/issues/420
process.exitCode = await runTemplateCLI(template);
