import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export interface ProjectConfig {
  tsx: boolean;
  ts: boolean;
  paths: {
    ui: string;
    blocks: string;
    snippets: string
  };
  alwaysForce: boolean;
  iconLibrary: string;
}

export const getConfig = (cwd: string): ProjectConfig | null => {
  const configFilePath = path.join(cwd, 'vynk.config.json');

  if (!fs.existsSync(configFilePath)) {
    console.log(chalk.red('Vynk config file not found'));
    console.log('Vynk is not initialized in this project');
    console.log(chalk.yellow('Run `vynk init` to initialize Vynk in your project'));
    process.exit(1);
  }

  const config = fs.readFileSync(configFilePath, 'utf8');

  return JSON.parse(config) as ProjectConfig;
}
