'use client'

import { useTheme } from "next-themes";
import { DarkModeToggle } from "../../../registry/components/ui/dark-mode-toggle"

export const DarkModeToggleShowcase = () => {
  const { theme, setTheme } = useTheme();
  const toggleDark = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return <DarkModeToggle toggleDark={toggleDark} />
}