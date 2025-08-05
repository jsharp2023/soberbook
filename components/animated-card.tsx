"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import type React from "react"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={className}>{children}</Card>
    </motion.div>
  )
}

export default AnimatedCard