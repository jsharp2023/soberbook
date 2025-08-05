"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bell,
  Phone,
  MessageCircle,
  Calendar,
  AlertTriangle,
  Heart,
  Clock,
  CheckCircle,
  X,
  Star,
  Shield,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface SponsorNotification {
  id: string
  type: "message" | "call" | "check_in" | "emergency" | "milestone" | "meeting_reminder" | "step_work"
  priority: "low" | "medium" | "high" | "urgent"
  sponsorName: string
  sponsorAvatar: string
  sponsorId: string
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  requiresResponse: boolean
  actionType?: "call_back" | "respond" | "confirm" | "schedule"
  metadata?: {
    meetingTime?: string
    stepNumber?: number
    daysUntilMeeting?: number
    emergencyLevel?: "mild" | "moderate" | "severe"
  }
}

interface SponsorNotificationSystemProps {
  isVisible: boolean
  onClose: () => void
}

export function SponsorNotificationSystem({ isVisible, onClose }: SponsorNotificationSystemProps) {
  const [notifications, setNotifications] = useState<SponsorNotification[]>([
    {
      id: "1",
      type: "emergency",
      priority: "urgent",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=40&width=40",
      sponsorId: "sponsor_1",
      title: "Emergency Check-in Request",
      message:
        "I noticed you missed our scheduled call. Are you okay? Please respond when you can. Remember, I'm here for you.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      requiresResponse: true,
      actionType: "call_back",
      metadata: { emergencyLevel: "moderate" },
    },
    {
      id: "2",
      type: "check_in",
      priority: "high",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=40&width=40",
      sponsorId: "sponsor_1",
      title: "Daily Check-in Reminder",
      message: "Good morning! How are you feeling today? Remember our conversation about triggers from yesterday.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      requiresResponse: true,
      actionType: "respond",
    },
    {
      id: "3",
      type: "step_work",
      priority: "medium",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=40&width=40",
      sponsorId: "sponsor_1",
      title: "Step 4 Progress Check",
      message: "How's your Step 4 inventory coming along? Let's schedule time to review what you've written so far.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      requiresResponse: false,
      actionType: "schedule",
      metadata: { stepNumber: 4 },
    },
    {
      id: "4",
      type: "milestone",
      priority: "medium",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=40&width=40",
      sponsorId: "sponsor_1",
      title: "Congratulations on 1 Year!",
      message:
        "I'm so proud of your progress! Your dedication to recovery inspires me. Let's celebrate this milestone properly. 🎉",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      requiresResponse: false,
    },
    {
      id: "5",
      type: "meeting_reminder",
      priority: "high",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=40&width=40",
      sponsorId: "sponsor_1",
      title: "Meeting Tonight - Don't Miss It",
      message:
        "Remember we have the Big Book study tonight at 7 PM. This chapter on resentments will be really helpful for you.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: false,
      requiresResponse: true,
      actionType: "confirm",
      metadata: { meetingTime: "7:00 PM", daysUntilMeeting: 0 },
    },
  ])

  const [soundEnabled, setSoundEnabled] = useState(true)
  const { toast } = useToast()

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every 10 seconds
        const newNotification: SponsorNotification = {
          id: Date.now().toString(),
          type: ["message", "check_in", "call"][Math.floor(Math.random() * 3)] as any,
          priority: ["medium", "high"][Math.floor(Math.random() * 2)] as any,
          sponsorName: "Lisa T.",
          sponsorAvatar: "/placeholder.svg?height=40&width=40",
          sponsorId: "sponsor_1",
          title: "New Message from Sponsor",
          message: [
            "Just checking in - how's your day going?",
            "Remember what we discussed about HALT (Hungry, Angry, Lonely, Tired)",
            "Proud of you for reaching out yesterday",
            "Don't forget to call if you need support",
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          isRead: false,
          requiresResponse: Math.random() > 0.5,
          actionType: "respond",
        }

        setNotifications((prev) => [newNotification, ...prev])

        if (soundEnabled) {
          // Play notification sound (in real app, you'd use actual audio)
          toast({
            title: "New Sponsor Message",
            description: newNotification.message,
            duration: 5000,
          })
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [soundEnabled, toast])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle
      case "call":
        return Phone
      case "message":
        return MessageCircle
      case "check_in":
        return Heart
      case "milestone":
        return Star
      case "meeting_reminder":
        return Calendar
      case "step_work":
        return CheckCircle
      default:
        return Bell
    }
  }

  const handleNotificationAction = (notification: SponsorNotification) => {
    switch (notification.actionType) {
      case "call_back":
        toast({
          title: "Calling Sponsor",
          description: `Initiating call with ${notification.sponsorName}...`,
        })
        break
      case "respond":
        toast({
          title: "Opening Chat",
          description: `Opening conversation with ${notification.sponsorName}`,
        })
        break
      case "confirm":
        toast({
          title: "Meeting Confirmed",
          description: `Confirmed attendance for tonight's meeting`,
        })
        break
      case "schedule":
        toast({
          title: "Scheduling Session",
          description: `Opening calendar to schedule with ${notification.sponsorName}`,
        })
        break
    }

    // Mark as read
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)))
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    toast({
      title: "Notification dismissed",
      description: "Notification has been removed",
    })
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => n.priority === "urgent" && !n.isRead).length

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl max-h-[80vh] bg-white dark:bg-gray-800 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                {urgentCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {urgentCount}
                  </motion.div>
                )}
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Sponsor Communications</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {unreadCount} unread • Priority support system
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={soundEnabled ? "text-blue-600" : "text-gray-400"}
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>
              {notifications.map((notification, index) => {
                const IconComponent = getTypeIcon(notification.type)

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                      !notification.isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={notification.sponsorAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{notification.sponsorName.charAt(0)}</AvatarFallback>
                        </Avatar>

                        {/* Priority indicator */}
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 ${getPriorityColor(notification.priority)} rounded-full flex items-center justify-center`}
                        >
                          <IconComponent className="w-2 h-2 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {notification.sponsorName}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            >
                              Sponsor
                            </Badge>
                            {notification.priority === "urgent" && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <Badge variant="destructive" className="text-xs">
                                  <Zap className="w-3 h-3 mr-1" />
                                  URGENT
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 text-gray-400 hover:text-gray-600"
                              onClick={() => dismissNotification(notification.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{notification.title}</h5>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{notification.message}</p>

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="flex gap-2 mb-3">
                            {notification.metadata.stepNumber && (
                              <Badge variant="outline" className="text-xs">
                                Step {notification.metadata.stepNumber}
                              </Badge>
                            )}
                            {notification.metadata.meetingTime && (
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.metadata.meetingTime}
                              </Badge>
                            )}
                            {notification.metadata.emergencyLevel && (
                              <Badge
                                variant="destructive"
                                className={`text-xs ${
                                  notification.metadata.emergencyLevel === "severe"
                                    ? "bg-red-600"
                                    : notification.metadata.emergencyLevel === "moderate"
                                      ? "bg-orange-500"
                                      : "bg-yellow-500"
                                }`}
                              >
                                {notification.metadata.emergencyLevel} concern
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          {notification.requiresResponse && (
                            <Button
                              size="sm"
                              onClick={() => handleNotificationAction(notification)}
                              className={`${
                                notification.priority === "urgent"
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-blue-600 hover:bg-blue-700"
                              } text-white`}
                            >
                              {notification.actionType === "call_back" && (
                                <>
                                  <Phone className="w-3 h-3 mr-1" />
                                  Call Back
                                </>
                              )}
                              {notification.actionType === "respond" && (
                                <>
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  Respond
                                </>
                              )}
                              {notification.actionType === "confirm" && (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Confirm
                                </>
                              )}
                              {notification.actionType === "schedule" && (
                                <>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Schedule
                                </>
                              )}
                            </Button>
                          )}

                          {!notification.isRead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="bg-transparent"
                            >
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {notifications.length === 0 && (
              <div className="p-8 text-center">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">All caught up!</h3>
                <p className="text-gray-500 dark:text-gray-400">No new sponsor communications at this time.</p>
              </div>
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Emergency Contact",
                    description: "Calling sponsor emergency line...",
                  })
                }}
                className="bg-transparent text-red-600 border-red-300 hover:bg-red-50"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Contact
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Quick Check-in",
                    description: "Sending daily check-in to sponsor...",
                  })
                }}
                className="bg-transparent"
              >
                <Heart className="w-4 h-4 mr-2" />
                Quick Check-in
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toast({
                    title: "Schedule Call",
                    description: "Opening calendar to schedule sponsor call...",
                  })
                }}
                className="bg-transparent"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
