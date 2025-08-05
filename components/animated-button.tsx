"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type React from "react"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  disabled?: boolean
}

export function AnimatedButton({ children, className, onClick, variant, size, disabled }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
      <Button className={className} onClick={onClick} variant={variant} size={size} disabled={disabled}>
        {children}
      </Button>
    </motion.div>
  )
}

