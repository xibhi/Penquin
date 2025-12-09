import { Command } from 'commander';
import { getRegistry } from '../../lib/getRegistry.js'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk';

export const build = new Command()
  .name('registry:build')
  .option('-c, --cwd', 'Working directory. Deafults to the current working directory', process.cwd())
  .description('builds the registry for components')
  .action(async (options: { cwd: string }) => {
    await buildRegistry(options.cwd);
  });


// Builds the registry for components
const buildRegistry = async (cwd: string) => {
  try {
    const registry = getRegistry();

    const registryStorePath = path.join(cwd, 'public', 'r');

    if (!fs.existsSync(registryStorePath)) {
      fs.mkdirSync(registryStorePath, { recursive: true });
    }

    for (const item of registry.items) {
      const componentRegistry = item;

      componentRegistry.files = componentRegistry.files.map(file => {
        const fileSourcePath = path.join(cwd, file.path);
        const fileContent = fs.readFileSync(fileSourcePath, 'utf-8');

        return {
          ...file,
          content: fileContent
        }
      });

      const fileDestinationPath = path.join(registryStorePath, `${componentRegistry.name}.json`);

      fs.writeFileSync(
        fileDestinationPath, 
        JSON.stringify(componentRegistry, null, 2)
      );
    }
  } catch (error) {
    console.log(chalk.red('Error while building registry E:', (error as Error).message));
    throw error;
  }
}