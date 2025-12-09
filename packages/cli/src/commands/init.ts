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
  const packageManager = await getPackageManager(cwd);
  
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
}