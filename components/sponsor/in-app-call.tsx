"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, MessageCircle, Minimize2, Maximize2, Move } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface InAppCallProps {
  isActive: boolean
  onEndCall: () => void
  contactName: string
  contactAvatar?: string
  contactPhone: string
  isEmergency?: boolean
}

export function InAppCall({
  isActive,
  onEndCall,
  contactName,
  contactAvatar,
  contactPhone,
  isEmergency = false,
}: InAppCallProps) {
  const [callStatus, setCallStatus] = useState<"connecting" | "ringing" | "connected" | "ended">("connecting")
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const callWindowRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!isActive) return

    // Center the call window initially
    const centerX = window.innerWidth / 2 - 192 // 192 is half of 384px (w-96)
    const centerY = window.innerHeight / 2 - 200 // Approximate half height
    setPosition({ x: centerX, y: centerY })

    // Simulate call connection process
    const connectionTimer = setTimeout(() => {
      setCallStatus("ringing")

      // Simulate answer after 3-5 seconds
      const answerTimer = setTimeout(
        () => {
          setCallStatus("connected")
          toast({
            title: "Call Connected",
            description: `You are now connected with ${contactName}`,
            duration: 3000,
          })
        },
        Math.random() * 2000 + 3000,
      )

      return () => clearTimeout(answerTimer)
    }, 1000)

    return () => clearTimeout(connectionTimer)
  }, [isActive, contactName, toast])

  useEffect(() => {
    if (callStatus !== "connected") return

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [callStatus])

  // Handle mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest(".drag-handle")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const newX = e.clientX - dragStart.x
    const newY = e.clientY - dragStart.y

    // Keep window within viewport bounds
    const windowWidth = callWindowRef.current?.offsetWidth || 384
    const windowHeight = callWindowRef.current?.offsetHeight || 400

    const boundedX = Math.max(0, Math.min(newX, window.innerWidth - windowWidth))
    const boundedY = Math.max(0, Math.min(newY, window.innerHeight - windowHeight))

    setPosition({ x: boundedX, y: boundedY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Add global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, dragStart, position])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleEndCall = () => {
    setCallStatus("ended")
    toast({
      title: "Call Ended",
      description: `Call with ${contactName} ended after ${formatDuration(callDuration)}`,
    })
    setTimeout(() => {
      onEndCall()
    }, 1000)
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Microphone On" : "Microphone Muted",
      description: isMuted ? "You can now speak" : "Your microphone is muted",
      duration: 2000,
    })
  }

  const handleToggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    toast({
      title: isSpeakerOn ? "Speaker Off" : "Speaker On",
      description: isSpeakerOn ? "Audio through earpiece" : "Audio through speaker",
      duration: 2000,
    })
  }

  const handleSendMessage = () => {
    toast({
      title: "Opening Chat",
      description: `Opening chat with ${contactName}`,
    })
  }

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={callWindowRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? "grabbing" : "default",
        }}
        onMouseDown={handleMouseDown}
      >
        <Card
          className={`${isMinimized ? "w-80" : "w-96"} bg-white dark:bg-gray-800 shadow-2xl ${
            isEmergency ? "border-red-200 dark:border-red-800" : "border-blue-200 dark:border-blue-800"
          } ${isDragging ? "shadow-3xl" : ""}`}
        >
          <CardHeader
            className={`pb-3 drag-handle cursor-grab active:cursor-grabbing ${
              isEmergency
                ? "bg-red-50 dark:bg-red-900/20"
                : callStatus === "connected"
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "bg-blue-50 dark:bg-blue-900/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <CardTitle
                className={`text-lg flex items-center gap-2 ${
                  isEmergency
                    ? "text-red-700 dark:text-red-400"
                    : callStatus === "connected"
                      ? "text-green-700 dark:text-green-400"
                      : "text-blue-700 dark:text-blue-400"
                }`}
              >
                <Phone className="w-5 h-5" />
                {callStatus === "connecting" && "Connecting..."}
                {callStatus === "ringing" && "Calling..."}
                {callStatus === "connected" && "In Call"}
                {callStatus === "ended" && "Call Ended"}
              </CardTitle>

              <div className="flex items-center gap-1">
                <Move className="w-4 h-4 text-gray-400 drag-handle cursor-grab" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {callStatus === "connected" && (
              <p className="text-sm text-green-600 dark:text-green-500">Duration: {formatDuration(callDuration)}</p>
            )}
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-6 text-center space-y-6">
              {/* Contact Info */}
              <div className="space-y-3">
                <motion.div
                  animate={callStatus === "ringing" ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: callStatus === "ringing" ? Number.POSITIVE_INFINITY : 0 }}
                >
                  <Avatar className="w-24 h-24 mx-auto border-4 border-white dark:border-gray-700 shadow-lg">
                    <AvatarImage src={contactAvatar || "/placeholder.svg?height=96&width=96"} />
                    <AvatarFallback className="text-2xl bg-blue-500 text-white">
                      {contactName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{contactName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{contactPhone}</p>
                  {isEmergency && (
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium mt-1">Emergency Call</p>
                  )}
                </div>
              </div>

              {/* Call Status Indicator */}
              <div className="flex justify-center">
                {callStatus === "connecting" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                )}

                {callStatus === "ringing" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </motion.div>
                )}

                {callStatus === "connected" && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Call Controls */}
              {callStatus === "connected" && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant={isMuted ? "default" : "outline"}
                    size="lg"
                    onClick={handleToggleMute}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`w-12 h-12 rounded-full ${isMuted ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant={isSpeakerOn ? "default" : "outline"}
                    size="lg"
                    onClick={handleToggleSpeaker}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`w-12 h-12 rounded-full ${
                      isSpeakerOn ? "bg-blue-500 hover:bg-blue-600 text-white" : ""
                    }`}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleSendMessage}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="w-12 h-12 rounded-full bg-transparent"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              )}

              {/* End Call Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleEndCall}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full"
                  size="lg"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
              </div>
            </CardContent>
          )}

          {/* Minimized View */}
          {isMinimized && (
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={contactAvatar || "/placeholder.svg?height=40&width=40"} />
                    <AvatarFallback className="text-sm bg-blue-500 text-white">
                      {contactName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{contactName}</p>
                    <p className="text-xs text-gray-500">
                      {callStatus === "connected" ? formatDuration(callDuration) : callStatus}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {callStatus === "connected" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleToggleMute}
                        onMouseDown={(e) => e.stopPropagation()}
                        className={`p-2 ${isMuted ? "text-red-500" : ""}`}
                      >
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEndCall}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
