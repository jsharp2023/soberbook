"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export const ParallaxBackground = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <motion.div
      className="fixed inset-0 z-[-1] bg-cover bg-center"
      style={{
        y,
        backgroundImage: "url('/background.jpg')", // Replace with your actual background
      }}
    />
  )
}
