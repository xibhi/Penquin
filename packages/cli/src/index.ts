#!/usr/bin/env node

import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'
import { build } from './commands/registry/buid.js';

async function main() {
  const program = new Command()
  .name('vynk')
  .description('add components and dependencies to your apps. (Backend snippets under developement')
  .version('1.0.0');

  program
  .addCommand(init)
  .addCommand(add)

  // Registry commands
  program
  .addCommand(build)

  program.parse();
}

main();