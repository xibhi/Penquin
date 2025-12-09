import { Command } from "commander";
import { getConfig, ProjectConfig } from "../lib/getConfig.js";
import path from 'path';
import { RegistryItem } from "../lib/getRegistry.js";
import fs from 'fs';
import chalk from 'chalk';
import prompts from 'prompts';
import { execa } from 'execa'
import { getPackageManager } from "../lib/getPackagetManager.js";
import { getSpinner } from "../lib/spinner.js";
import { getRegistryComponent } from "../lib/getRegistryComponent.js";

// Track installed components to prevent circular dependencies
const installedComponents = new Set<string>();

export const add = new Command()
  .name('add')
  .description('add components to your project')
  .argument('[components...]', 'Components to add') // to add multiple components
  .option('-f, --force', 'Force add components', false)
  .option('-c, --cwd', 'Working directory. Defaults to the current working directory', process.cwd())
  .action(async (components: string[], options: { force: boolean, cwd: string }) => {
    const config: ProjectConfig | null = getConfig(options.cwd);

    if (!config) {
      console.log(chalk.red('No configuration found. Please run initialize Vynk first to start adding components.'));
      return;
    }

    // if no ts or tsx is configured, ask the user if they want to continue
    if (!config.tsx || !config.ts) {
      const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Only tsx or ts is currently supported. If you still want to install components without ts or tsx you have to configure them by yourself. Do you want to continue?',
        initial: false,
      });

      if (!confirm) {
        return;
      }
    }

    if (!components || components.length === 0) {
      console.log(chalk.red('No components provided'));
      return;
    }

    try {
      await addComponents({
        components,
        config,
        cwd: options.cwd,
        options: {
          force: options.force,
        }
      });
    } catch (error) {
      console.error(chalk.red('Failed to add components:'), error);
      process.exit(1);
    }
  });

interface AddComponentsParams {
  components: string[];
  config: ProjectConfig;
  cwd: string;
  options: {
    force: boolean;
  }
}

// Add Components to users project
const addComponents = async ({ components, config, cwd, options }: AddComponentsParams) => {
  const spinner = getSpinner('Adding components...');

  try {
    spinner.start();

    for (const component of components) {
      // Skip if already installed to prevent circular dependencies
      if (installedComponents.has(component)) {
        continue;
      }

      const registryComponent: RegistryItem | null = await getRegistryComponent(component);

      if (!registryComponent) {
        spinner.stop();
        console.log(chalk.red(`Component ${component} not found in registry`));
        spinner.start();
        continue;
      }

      const componentType = registryComponent.type.split(':')[1];
      if (!componentType || !(componentType in config.paths)) {
        spinner.stop();
        console.log(chalk.red(`Invalid component type: ${registryComponent.type}`));
        spinner.start();
        continue;
      }

      // Create component directory in user's project (if it doesn't exists)
      const userComponentPath = path.resolve(cwd, config.paths[componentType as keyof typeof config.paths]);
      // Create the default directory only if the 'target' property is not defined for that comp
      if (!fs.existsSync(userComponentPath) && !registryComponent.files[0].target) {
        fs.mkdirSync(userComponentPath, { recursive: true });
      }

      // Install required dependencies first
      try {
        await installDependencies(cwd, registryComponent.dependencies, registryComponent.devDependencies);
      } catch (error) {
        spinner.stop();
        console.log(chalk.red(`Failed to install dependencies for ${component}: ${error}`));
        spinner.start();
        continue;
      }

      // Copy files from my registry to user's project
      for (const file of registryComponent.files) {
        try {
          // If the target is defined use that, if it does not exists use the path from the config file
          const targetDir = file.target
            ? path.join(cwd, file.target)
            : userComponentPath;

          // Ensure target directory exists
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }

          const targetPath = path.join(targetDir, path.basename(file.path));

          // Check if the component already exists and prompt user to overwrite
          if(fs.existsSync(targetPath) && !options.force && !config.alwaysForce) {
            spinner.stop();
            const { confirm } = await prompts({
              type: 'confirm',
              name: 'confirm',
              message: `${component} already exists. Do you want to overwrite?`,
              initial: false,
            });
      
            spinner.start();

            if (!confirm) {
              continue;
            }
          }

          if (!file.content) {
            throw new Error(`No content found for file: ${file.path}`);
          }

          fs.writeFileSync(targetPath, file.content);

          // Mark component as installed
          installedComponents.add(component);

          // Recursively add all the dependent components
          if (registryComponent.registryDependencies) {
            await addComponents({
              components: registryComponent.registryDependencies,
              config,
              cwd,
              options
            });
          }
        } catch (error: any) {
          spinner.stop();
          console.log(chalk.red(`Failed to add ${component} component`));
          console.log(chalk.red(`Failed to copy file ${file.path}: ${error.message}`));
          spinner.start();
          continue;
        }
      }
    }

    spinner.succeed('Components added successfully');
  } catch (error) {
    spinner.fail('Failed to add components');
    throw error;
  } finally {
    spinner.stop();
  }
}

// Add package dependencies
const installDependencies = async (
  cwd: string,
  dependencies?: string[],
  devDependencies?: string[]
) => {
  if(
    (!dependencies || dependencies.length === 0) &&
    (!devDependencies || devDependencies.length === 0)
  ) {
    return;
  }
  
  try {
    const packageManager = await getPackageManager(cwd);

    if (dependencies?.length) {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          ...(packageManager === 'deno'
            ? dependencies.map((dep) => `npm:${dep}`)
            : dependencies),
        ],
        {
          cwd,
        }
      )
    }

    if (devDependencies?.length) {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          '-D',
          ...(packageManager === 'deno'
            ? devDependencies.map((dep) => `npm:${dep}`)
            : devDependencies),
        ],
        {
          cwd
        }
      )
    }
  } catch (error) {
    throw new Error(`Failed to install packages: ${error}`);
  }
};