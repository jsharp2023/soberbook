"use client"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Award, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/animated-card"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RecoveryStats() {
  const sobrietyDate = new Date("2023-01-15")
  const today = new Date()
  const daysSober = Math.floor((today.getTime() - sobrietyDate.getTime()) / (1000 * 60 * 60 * 24))
  const monthsSober = Math.floor(daysSober / 30)
  const [currentStep, setCurrentStep] = useState(4)
  const [meetingCount, setMeetingCount] = useState(47)

  return (
    <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
            >
              <Award className="w-5 h-5 text-yellow-500" />
            </motion.div>
            My Recovery Journey
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.5 }}
            className="text-3xl font-bold text-blue-600 dark:text-blue-400"
          >
            {daysSober}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Days Sober
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Badge
              variant="secondary"
              className="mt-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            >
              {monthsSober} months clean
            </Badge>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
            >
              <Calendar className="w-5 h-5 mx-auto mb-1 text-blue-500" />
            </motion.div>
            <Select value={meetingCount.toString()} onValueChange={(value) => setMeetingCount(Number.parseInt(value))}>
              <SelectTrigger className="w-full h-auto p-0 border-none bg-transparent shadow-none focus:ring-0 flex items-center justify-center">
                <SelectValue>
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{meetingCount}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Meetings</div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 21 }, (_, i) => i * 5).map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} meetings attended
                  </SelectItem>
                ))}
                <SelectItem value="100">100+ meetings attended</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer"
          >
            <motion.div
              animate={{ rotateY: [0, 180, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
            >
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-green-500" />
            </motion.div>
            <Select value={currentStep.toString()} onValueChange={(value) => setCurrentStep(Number.parseInt(value))}>
              <SelectTrigger className="w-full h-auto p-0 border-none bg-transparent shadow-none focus:ring-0 flex items-center justify-center">
                <SelectValue>
                  <div className="text-center flex flex-col items-center justify-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Step {currentStep}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Current Step</div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Step 1 - Powerlessness</SelectItem>
                <SelectItem value="2">Step 2 - Higher Power</SelectItem>
                <SelectItem value="3">Step 3 - Decision</SelectItem>
                <SelectItem value="4">Step 4 - Moral Inventory</SelectItem>
                <SelectItem value="5">Step 5 - Admitting Wrongs</SelectItem>
                <SelectItem value="6">Step 6 - Ready for Change</SelectItem>
                <SelectItem value="7">Step 7 - Humility</SelectItem>
                <SelectItem value="8">Step 8 - Making Amends List</SelectItem>
                <SelectItem value="9">Step 9 - Making Amends</SelectItem>
                <SelectItem value="10">Step 10 - Continued Inventory</SelectItem>
                <SelectItem value="11">Step 11 - Prayer & Meditation</SelectItem>
                <SelectItem value="12">Step 12 - Spiritual Awakening</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
