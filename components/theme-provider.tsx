"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: "class" | "data-theme"
}

export function ThemeProvider({
  children,
  attribute = "class", // enables Tailwind dark mode with `class`
}: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
