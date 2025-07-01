import { Command } from 'commander'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { execa } from 'execa';
import { getPackageManager } from '../lib/getPackagetManager.js';
import { getSpinner } from '../lib/spinner.js';
import { CN_FUNCTION_FILE_CONTENT, DEFAULT_CONFIG_FILE_CONTENT, GLOBAL_CSS_VARS, INITIAL_REQUIRED_DEPENDENCIES } from '../constants/index.js';

export const init = new Command()
.name('init')
.description('initialize Vynk into your project')
// .argument // Not supporting to add components while initializing vinq. If needed use this to optionally accept the components to add
.action(async (options: { cwd: string }) => {
  const cwd = process.cwd();
  const configFilePath = path.join(cwd, 'vynk.config.json');

  const spinner = getSpinner('Initializing Vynk');

  try {
    // Skip if config file exists
    if(fs.existsSync(configFilePath)) {
      console.log(chalk.yellow('⚠️  Config file already exists. Skipping.'));
      return;
    }

    spinner.start();

    // Create config file if it doesn't exists
    fs.writeFileSync(configFilePath, DEFAULT_CONFIG_FILE_CONTENT);

    await addInitialSetup(cwd);

    updateGlobalCSS(cwd);

    spinner.succeed('Vynk initialized successfully!');
  } catch (error) {
    spinner.fail('Failed to initialize Vynk');
    console.error(error);
    process.exit(1);
  }
});

async function addInitialSetup(cwd: string) {
  const packageManager = getPackageManager();
  
  // Install required dependencies
  await execa(packageManager, ['install', ...INITIAL_REQUIRED_DEPENDENCIES], { cwd });
  
  // Create utils directory if it doesn't exist
  const utilsDir = path.join(cwd, 'src', 'lib');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  
  // Create cn utility function
  const cnFilePath = path.join(utilsDir, 'utils.ts');
  if (!fs.existsSync(cnFilePath)) {
    fs.writeFileSync(cnFilePath, CN_FUNCTION_FILE_CONTENT);
  }
}

function updateGlobalCSS(cwd: string) {
  const globalCSSPath = path.join(cwd, 'src', 'app', 'globals.css');
  
  if (fs.existsSync(globalCSSPath)) {
    const existingContent = fs.readFileSync(globalCSSPath, 'utf-8');
    if (!existingContent.includes('@layer base')) {
      fs.appendFileSync(globalCSSPath, '\n' + GLOBAL_CSS_VARS);
    }
  }
}wd);

    console.log(chalk.green('Config file created successfully'));
    
    spinner.succeed('Vynk initialized successfully.');
    console.log('You can now run `npx vynk add componentName` to add components to your project');
  } catch(error) {
    spinner.fail('Error while initializing Vynk to your project.');
    console.log(chalk.yellow('Please try again. If the issue still persists contact the creater of this (btw thats me 😁)'));
    console.error(error);
  }
});

const addInitialSetup = async (cwd: string) => {
  try {
    const libPath = path.join(cwd, 'src', 'lib');

    // Create lib dir if doesn't exists
    if(!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    const CNFunctionFilePath = path.join(libPath, 'utils.ts');

    // Write the cn function file
    fs.writeFileSync(CNFunctionFilePath, CN_FUNCTION_FILE_CONTENT);

    const packageManager = await getPackageManager(cwd);

    try {
      await execa(
        packageManager,
        [
          packageManager === 'npm' ? 'install' : 'add',
          ...(packageManager === 'deno'
            ? INITIAL_REQUIRED_DEPENDENCIES.map((dep) => `npm:${dep}`)
            : INITIAL_REQUIRED_DEPENDENCIES),
        ]
        ,
        {
          cwd,
        }
      )

      console.log(chalk.green('Successfully installed required dependencies'))
    } catch (error: any) {
      console.log(chalk.red(`Failed to install dependencies: ${error.message}`))
      console.log(chalk.yellow('You may need to install these packages manually:'))
      console.log(chalk.yellow('- class-variance-authority'))
      console.log(chalk.yellow('- tailwind-merge'))
      process.exit(1)
    }
  } catch (error) {
    console.log('Error while Initializing the setup E:', (error as Error).message);
    throw error;
  }
}

const updateGlobalCSS = (cwd: string) => {
  const possiblePaths = [
    'src/app/globals.css',
    'src/styles/globals.css',
    'styles/globals.css',
    'globals.css'
  ]

  for(const relPath of possiblePaths) {
    try {
      const fullPath = path.join(cwd, relPath);
      if(!fs.existsSync(fullPath)) continue;
  
      const existingContent = fs.readFileSync(fullPath, 'utf-8');
  
      const updatedContent = `${GLOBAL_CSS_VARS.trim()}\n\n${existingContent}`;
      
      fs.writeFileSync(fullPath, updatedContent);
  
      return;
    } catch (error) {
      console.log(chalk.red('Error occured while updating global css vars. You have add css vars yourself.'));
    }
  }
}