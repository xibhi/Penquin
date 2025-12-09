import chalk from "chalk";
import { RegistryItem } from "./getRegistry.js";
import { BASE_URL } from "../constants/index.js";

export const getRegistryComponent = async (component: string): Promise<RegistryItem | null> => {
  
  const res = await fetch(`${BASE_URL}/r/${component}.json`);

  if(!res.ok) {
    console.log(chalk.red('Component not found in registry'));
    return null
  }

  const componentRegistryContent = await res.json();

  return componentRegistryContent as RegistryItem;
}