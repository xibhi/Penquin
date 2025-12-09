export const DEFAULT_CONFIG_FILE_CONTENT =
`{
  "tsx": true,
  "ts": true,
  "paths": {
    "ui": "src/components/ui",
    "block": "src/components/blocks",
    "snippets": "src/snippets"
  },
  "alwaysForce": false,
  "iconLibrary": "@tabler/icons-react"
}`

export const CN_FUNCTION_FILE_CONTENT =
`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`


export const INITIAL_REQUIRED_DEPENDENCIES = [
  'class-variance-authority@latest',
  'tailwind-merge@latest'
] as const

export const GLOBAL_CSS_VARS =
`:root {
  --background: #ffffff;
  --foreground: #171717;

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);

  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);

  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);

  --destructive: oklch(0.577 0.245 27.325);

  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;

  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);

  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);

  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);

  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);

  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);

  --destructive: oklch(0.704 0.191 22.216);

  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  --color-destructive: var(--destructive);

  --color-border: var(--border);
  --color-input: var(--input);
}`


// Use this for dev
// export const BASE_URL = 'http://localhost:3000'

// Use this for prod
export const BASE_URL = 'https://vynk.live'