"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function AutoThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Reset progress when theme changes
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 100 / 30 // 3 seconds = 30 intervals of 100ms
      })
    }, 100)

    return () => clearInterval(interval)
  }, [theme])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg p-3 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex items-center gap-2 text-sm">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
        />
        <span className="text-gray-700 dark:text-gray-300">Auto Theme</span>
      </div>

      <div className="mt-2 w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Next: {theme === "light" ? "Dark" : "Light"} mode
      </div>
    </motion.div>
  )
}

export default AutoThemeIndicator