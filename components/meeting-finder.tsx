"use client"

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Video } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"

const upcomingMeetings = [
  {
    id: 1,
    name: "Morning Serenity AA",
    type: "AA",
    time: "7:00 AM",
    location: "Community Center",
    isVirtual: false,
    attendees: 12,
  },
  {
    id: 2,
    name: "NA Step Study",
    type: "NA",
    time: "12:00 PM",
    location: "Virtual Meeting",
    isVirtual: true,
    attendees: 8,
  },
  {
    id: 3,
    name: "Al-Anon Family Group",
    type: "Al-Anon",
    time: "6:30 PM",
    location: "St. Mary's Church",
    isVirtual: false,
    attendees: 15,
  },
]

export function MeetingFinder() {
  return (
    <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
            Today's Meetings
          </CardTitle>
        </motion.div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <div className="space-y-3 mt-4">
          {upcomingMeetings.map((meeting, index) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 },
              }}
              className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{meeting.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          meeting.type === "AA"
                            ? "border-blue-500 text-blue-600 dark:text-blue-400"
                            : meeting.type === "NA"
                              ? "border-green-500 text-green-600 dark:text-green-400"
                              : "border-purple-500 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {meeting.type}
                      </Badge>
                    </motion.div>
                    {meeting.isVirtual && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      >
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                          <Video className="w-3 h-3 mr-1" />
                          Virtual
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </div>
                <AnimatedButton size="sm" variant="outline">
                  Join
                </AnimatedButton>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
              >
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meeting.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {meeting.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {meeting.attendees}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <AnimatedButton variant="outline" className="w-full mt-6 bg-transparent">
            Find More Meetings
          </AnimatedButton>
        </motion.div>
      </CardContent>
    </AnimatedCard>
  )
}
