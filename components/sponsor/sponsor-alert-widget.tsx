"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Bell, Phone, MessageCircle, AlertTriangle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface SponsorAlert {
  id: string
  type: "urgent" | "check_in" | "reminder"
  sponsorName: string
  sponsorAvatar: string
  message: string
  timestamp: Date
  requiresAction: boolean
}

interface SponsorAlertWidgetProps {
  onOpenNotifications: () => void
}

export function SponsorAlertWidget({ onOpenNotifications }: SponsorAlertWidgetProps) {
  const [alerts, setAlerts] = useState<SponsorAlert[]>([
    {
      id: "1",
      type: "urgent",
      sponsorName: "Lisa T.",
      sponsorAvatar: "/placeholder.svg?height=32&width=32",
      message: "Emergency check-in request - please respond",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      requiresAction: true,
    },
  ])

  const [isVisible, setIsVisible] = useState(true)
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)
  const [messageText, setMessageText] = useState("")
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const { toast } = useToast()

  // Auto-hide after 30 seconds unless urgent
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.type === "urgent"))
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) {
        // 5% chance every 10 seconds
        const newAlert: SponsorAlert = {
          id: Date.now().toString(),
          type: Math.random() > 0.8 ? "urgent" : "check_in",
          sponsorName: "Lisa T.",
          sponsorAvatar: "/placeholder.svg?height=32&width=32",
          message: [
            "Daily check-in reminder",
            "How are you feeling today?",
            "Remember our meeting tonight",
            "Thinking of you - stay strong",
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          requiresAction: Math.random() > 0.5,
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 2)]) // Keep max 3 alerts
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleCallSponsor = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId)
    if (!alert) return

    // Expand the alert to show message input
    setExpandedAlert(alertId)

    toast({
      title: "Calling Sponsor",
      description: `Initiating call with ${alert.sponsorName}...`,
    })
  }

  const handleSendMessage = async (alertId: string) => {
    if (!messageText.trim()) return

    const alert = alerts.find((a) => a.id === alertId)
    if (!alert) return

    setIsSendingMessage(true)

    // Simulate sending message
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${alert.sponsorName}`,
    })

    setMessageText("")
    setIsSendingMessage(false)
    setExpandedAlert(null)

    // Remove alert after successful message
    setAlerts((prev) => prev.filter((a) => a.id !== alertId))
  }

  const handleQuickMessage = (alertId: string) => {
    const alert = alerts.find((a) => a.id === alertId)
    if (!alert) return

    toast({
      title: "Quick Response",
      description: `Sending message to ${alert.sponsorName}`,
    })

    // Remove alert after action
    setAlerts((prev) => prev.filter((a) => a.id !== alertId))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId))
    setExpandedAlert(null)
    setMessageText("")
  }

  const handleKeyPress = (e: React.KeyboardEvent, alertId: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(alertId)
    }
  }

  if (!isVisible || alerts.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-4 right-4 z-40 max-w-sm"
    >
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`mb-3 rounded-lg shadow-lg border-l-4 ${
              alert.type === "urgent"
                ? "bg-red-50 dark:bg-red-900/20 border-red-500 shadow-red-200/50"
                : "bg-blue-50 dark:bg-blue-900/20 border-blue-500 shadow-blue-200/50"
            } backdrop-blur-md overflow-hidden`}
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={alert.sponsorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{alert.sponsorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                      alert.type === "urgent" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  >
                    {alert.type === "urgent" ? (
                      <AlertTriangle className="w-2 h-2 text-white" />
                    ) : (
                      <Shield className="w-2 h-2 text-white" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{alert.sponsorName}</h4>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    >
                      Sponsor
                    </Badge>
                    {alert.type === "urgent" && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Badge variant="destructive" className="text-xs">
                          URGENT
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{alert.message}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {alert.requiresAction && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleCallSponsor(alert.id)}
                            className={`h-7 text-xs ${
                              alert.type === "urgent" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                            } text-white`}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickMessage(alert.id)}
                            className="h-7 text-xs bg-transparent"
                          >
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Reply
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {alert.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => dismissAlert(alert.id)}
                        className="w-6 h-6 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Message Section */}
            <AnimatePresence>
              {expandedAlert === alert.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50"
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Send a message to {alert.sponsorName}:
                      </h5>
                      <Textarea
                        placeholder="Type your message here... (Press Enter to send)"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, alert.id)}
                        className="min-h-[80px] text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                        disabled={isSendingMessage}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Press Enter to send • Shift+Enter for new line
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setExpandedAlert(null)
                            setMessageText("")
                          }}
                          className="h-7 text-xs"
                          disabled={isSendingMessage}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSendMessage(alert.id)}
                          disabled={!messageText.trim() || isSendingMessage}
                          className={`h-7 text-xs ${
                            alert.type === "urgent" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                          } text-white`}
                        >
                          {isSendingMessage ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-3 h-3 border border-white border-t-transparent rounded-full mr-1"
                            />
                          ) : (
                            <Send className="w-3 h-3 mr-1" />
                          )}
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* View All Button */}
      {alerts.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenNotifications}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg"
          >
            <Bell className="w-4 h-4 mr-2" />
            View All Sponsor Messages
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
