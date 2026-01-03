import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface RegistryItem {
  name: string;
  description: string;
  type: 'registry:ui' | 'registry:block' | 'registry:snippet' | 'registry:file';
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: {
    path: string;
    type: 'registry:ui' | 'registry:block' | 'registry:snippet' | 'registry:file';
    target?: string,
    content?: string
  }[];
}


interface Registry {
  title: string,
  description: string,
  items: RegistryItem[]
}

export const getRegistry = (): Registry => {
  const registryPath = path.resolve(__dirname, '../../../../registry.json');
  
  if (!fs.existsSync(registryPath)) {
    throw new Error('Registry directory not found');
  }

  const rawRegistryContent = fs.readFileSync(registryPath, 'utf-8');
  const registry = JSON.parse(rawRegistryContent);

  return registry as Registry;
}; 