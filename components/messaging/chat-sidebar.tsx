"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Users, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  sobrietyBadge?: string
  isTyping?: boolean
  lastSeen?: string
}

interface ChatSidebarProps {
  selectedChat: string | null
  onSelectChat: (chatId: string) => void
  onStartNewChat: () => void
}

export function ChatSidebar({ selectedChat, onSelectChat, onStartNewChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah M. (Sponsor)",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "How are you feeling about tomorrow's meeting?",
      timestamp: "2m ago",
      unreadCount: 2,
      isOnline: true,
      sobrietyBadge: "5 years",
      isTyping: false,
    },
    {
      id: "2",
      name: "Mike C.",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for sharing your experience today",
      timestamp: "15m ago",
      unreadCount: 0,
      isOnline: true,
      sobrietyBadge: "2 years",
      isTyping: true,
    },
    {
      id: "3",
      name: "Emma R.",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The meditation session was really helpful",
      timestamp: "1h ago",
      unreadCount: 1,
      isOnline: false,
      sobrietyBadge: "1 year",
      lastSeen: "30m ago",
    },
    {
      id: "4",
      name: "Recovery Group Chat",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Alex: See you all at tonight's meeting!",
      timestamp: "2h ago",
      unreadCount: 5,
      isOnline: true,
      isTyping: false,
    },
    {
      id: "5",
      name: "David W.",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Congratulations on your milestone! 🎉",
      timestamp: "1d ago",
      unreadCount: 0,
      isOnline: false,
      sobrietyBadge: "3 years",
      lastSeen: "2h ago",
    },
  ])

  const { toast } = useToast()

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setContacts((prev) =>
        prev.map((contact) => {
          // Randomly update typing status
          if (Math.random() < 0.1) {
            return { ...contact, isTyping: !contact.isTyping }
          }
          // Randomly update online status
          if (Math.random() < 0.05) {
            return { ...contact, isOnline: !contact.isOnline }
          }
          return contact
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleContactClick = (contact: Contact) => {
    onSelectChat(contact.id)

    // Mark messages as read
    if (contact.unreadCount > 0) {
      setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, unreadCount: 0 } : c)))
    }

    toast({
      title: "Chat opened",
      description: `Now chatting with ${contact.name}`,
    })
  }

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages
          </h2>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={onStartNewChat}
            >
              <Users className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 dark:bg-gray-700 border-none"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 ${
                selectedChat === contact.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
              }`}
              onClick={() => handleContactClick(contact)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Online indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: contact.isOnline ? 1 : 0 }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{contact.name}</h3>
                      {contact.sobrietyBadge && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                        >
                          {contact.sobrietyBadge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{contact.timestamp}</span>
                      {contact.unreadCount > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center"
                        >
                          {contact.unreadCount}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {contact.isTyping ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          className="text-blue-500 italic"
                        >
                          typing...
                        </motion.span>
                      ) : (
                        contact.lastMessage
                      )}
                    </p>

                    {!contact.isOnline && contact.lastSeen && (
                      <span className="text-xs text-gray-400">{contact.lastSeen}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredContacts.length === 0 && (
          <div className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No conversations found</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={onStartNewChat}>
              Start New Chat
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatSidebar