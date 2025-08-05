"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/animated-card"

const stories = [
  {
    id: 1,
    user: "Your Story",
    avatar: "/placeholder.svg?height=60&width=60",
    isOwn: true,
  },
  {
    id: 2,
    user: "Sarah J.",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 3,
    user: "Mike C.",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 4,
    user: "Emma R.",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
  {
    id: 5,
    user: "Alex K.",
    avatar: "/placeholder.svg?height=60&width=60",
    hasStory: true,
  },
]

export function Stories() {
  return (
    <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-4">
        <div className="flex gap-3 overflow-x-auto">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer"
            >
              <div
                className={`relative ${story.hasStory ? "ring-2 ring-blue-500 dark:ring-blue-400 rounded-full p-1" : ""}`}
              >
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={story.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{story.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                </motion.div>
                {story.isOwn && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                    className="absolute -bottom-1 -right-1 bg-blue-600 dark:bg-blue-500 rounded-full p-1"
                  >
                    <Plus className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="text-xs text-center font-medium text-gray-900 dark:text-gray-100"
              >
                {story.user}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
