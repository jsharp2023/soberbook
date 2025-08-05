"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Sun className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleClick}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div animate={{ rotate: theme === "light" ? 0 : 180 }} transition={{ duration: 0.3 }}>
        {theme === "light" ? (
          <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </motion.div>
    </Button>
  )
}
