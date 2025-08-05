"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, MessageCircle, AlertTriangle, X, Clock, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { InAppCall } from "./in-app-call"

export function SponsorEmergencyButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isButtonHidden, setIsButtonHidden] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [activeContact, setActiveContact] = useState<{
    name: string
    phone: string
    avatar?: string
  } | null>(null)
  const { toast } = useToast()

  const sponsorContacts = [
    {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Primary Sponsor",
      available: true,
    },
    {
      name: "Mike Chen",
      phone: "(555) 987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Backup Contact",
      available: true,
    },
    {
      name: "Dr. Lisa Rodriguez",
      phone: "(555) 456-7890",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Therapist",
      available: false,
    },
  ]

  const handleEmergencyCall = (contact: (typeof sponsorContacts)[0]) => {
    if (isCallActive) {
      toast({
        title: "Call in Progress",
        description: "Please end the current call before starting a new one.",
        variant: "destructive",
      })
      return
    }

    setActiveContact({
      name: contact.name,
      phone: contact.phone,
      avatar: contact.avatar,
    })
    setIsCallActive(true)

    toast({
      title: "Emergency Call Initiated",
      description: `Calling ${contact.name}...`,
    })
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setActiveContact(null)
  }

  const handleSendMessage = (contactName: string) => {
    toast({
      title: "Message Sent",
      description: `Emergency message sent to ${contactName}`,
    })
  }

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded)
    setIsButtonHidden(true)
  }

  return (
    <>
      {/* In-App Call Component */}
      {isCallActive && activeContact && (
        <InAppCall
          isActive={isCallActive}
          onEndCall={handleEndCall}
          contactName={activeContact.name}
          contactPhone={activeContact.phone}
          contactAvatar={activeContact.avatar}
          isEmergency={true}
        />
      )}

      {/* Emergency Button */}
      {!isButtonHidden && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleButtonClick}
              className={`w-16 h-16 rounded-full shadow-lg ${
                isExpanded ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700"
              } text-white border-4 border-white`}
            >
              <AlertTriangle className="w-8 h-8" />
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Expanded Emergency Support Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="w-96 bg-white dark:bg-gray-800 shadow-2xl border-red-200 dark:border-red-800">
              <CardHeader className="bg-red-50 dark:bg-red-900/20 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Emergency Support
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsExpanded(false)
                      setIsButtonHidden(false)
                    }}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-red-600 dark:text-red-500">
                  Reach out for immediate support when you need it most.
                </p>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => {
                      toast({
                        title: "Crisis Hotline",
                        description: "Connecting to 24/7 crisis support...",
                      })
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Crisis Line
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Emergency Services",
                        description: "Calling 911...",
                      })
                    }}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Call 911
                  </Button>
                </div>

                {/* Sponsor Contacts */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Your Support Network</h4>
                  {sponsorContacts.map((contact, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-500 text-white text-sm">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{contact.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{contact.role}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <div
                              className={`w-2 h-2 rounded-full ${contact.available ? "bg-green-500" : "bg-gray-400"}`}
                            />
                            <span className="text-xs text-gray-500">{contact.available ? "Available" : "Offline"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEmergencyCall(contact)}
                          disabled={!contact.available || isCallActive}
                          className="bg-green-500 hover:bg-green-600 text-white px-3"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendMessage(contact.name)}
                          className="px-3"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Resources */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Finding Meetings",
                          description: "Locating nearby AA/NA meetings...",
                        })
                      }}
                      className="text-xs"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Find Meetings
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Meditation Started",
                          description: "Starting 5-minute breathing exercise...",
                        })
                      }}
                      className="text-xs"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Breathe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
