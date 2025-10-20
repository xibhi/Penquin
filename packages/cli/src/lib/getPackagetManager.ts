import fs from 'fs'
import path from 'path'

export async function getPackageManager(
  targetDir: string,
  { withFallback }: { withFallback?: boolean } = { withFallback: false }
): Promise<'yarn' | 'pnpm' | 'bun' | 'npm' | 'deno'> {
  const hasFile = (file: string) => fs.existsSync(path.join(targetDir, file))

  // Detect by lockfiles first
  if (hasFile('pnpm-lock.yaml')) return 'pnpm'
  if (hasFile('yarn.lock')) return 'yarn'
  if (hasFile('bun.lockb')) return 'bun'
  if (hasFile('deno.json') || hasFile('deno.jsonc')) return 'deno'

  if (!withFallback) {
    // Fall back to npm when no explicit indicator is found
    return 'npm'
  }

  // Fallback to user agent if requested
  const userAgent = process.env.npm_config_user_agent || ''
  if (userAgent.startsWith('yarn')) return 'yarn'
  if (userAgent.startsWith('pnpm')) return 'pnpm'
  if (userAgent.startsWith('bun')) return 'bun'
  return 'npm'
}

export async function getPackageRunner(cwd: string) {
  const packageManager = await getPackageManager(cwd)

  if (packageManager === 'pnpm') return 'pnpm dlx'

  if (packageManager === 'bun') return 'bunx'

  return 'npx'
}