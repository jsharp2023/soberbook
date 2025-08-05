"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreHorizontal, Smile, Paperclip, ImageIcon, Check, CheckCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  type: "text" | "image" | "milestone" | "meeting"
  isRead: boolean
  reactions?: { emoji: string; count: number; users: string[] }[]
}

interface ChatWindowProps {
  chatId: string
  contactName: string
  contactAvatar: string
  isOnline: boolean
  sobrietyBadge?: string
  isTyping?: boolean
}

export function ChatWindow({ chatId, contactName, contactAvatar, isOnline, sobrietyBadge, isTyping }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "other",
      senderName: contactName,
      senderAvatar: contactAvatar,
      content: "Hey! How are you feeling about tomorrow's meeting?",
      timestamp: "10:30 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "2",
      senderId: "me",
      senderName: "John Doe",
      senderAvatar: "/placeholder.svg?height=32&width=32",
      content: "I'm feeling a bit nervous, but I know it's important to go. Thanks for checking in! 🙏",
      timestamp: "10:32 AM",
      type: "text",
      isRead: true,
      reactions: [{ emoji: "❤️", count: 1, users: [contactName] }],
    },
    {
      id: "3",
      senderId: "other",
      senderName: contactName,
      senderAvatar: contactAvatar,
      content: "That's completely normal! Remember, we're all there to support each other. You've got this! 💪",
      timestamp: "10:35 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "4",
      senderId: "me",
      senderName: "John Doe",
      senderAvatar: "/placeholder.svg?height=32&width=32",
      content: "🎉 Just hit 365 days sober today! Couldn't have done it without your support.",
      timestamp: "2:15 PM",
      type: "milestone",
      isRead: false,
      reactions: [
        { emoji: "🎉", count: 2, users: [contactName, "Emma R."] },
        { emoji: "❤️", count: 1, users: [contactName] },
      ],
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const emojis = ["😊", "❤️", "🙏", "💪", "🎉", "👍", "😢", "😅", "🤗", "✨"]

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate receiving messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const newMsg: Message = {
          id: Date.now().toString(),
          senderId: "other",
          senderName: contactName,
          senderAvatar: contactAvatar,
          content: [
            "How's your day going?",
            "Remember to take it one day at a time",
            "Proud of your progress!",
            "See you at the meeting tonight?",
          ][Math.floor(Math.random() * 4)],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text",
          isRead: false,
        }
        setMessages((prev) => [...prev, newMsg])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [contactName, contactAvatar])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSending(true)

    const message: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "John Doe",
      senderAvatar: "/placeholder.svg?height=32&width=32",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isRead: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSending(false)

    // Mark as read after a delay
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, isRead: true } : msg)))
    }, 2000)

    toast({
      title: "Message sent",
      description: `Sent to ${contactName}`,
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji)
          if (existingReaction) {
            // Toggle reaction
            const hasUserReacted = existingReaction.users.includes("John Doe")
            if (hasUserReacted) {
              return {
                ...msg,
                reactions: msg.reactions
                  ?.map((r) =>
                    r.emoji === emoji
                      ? {
                          ...r,
                          count: r.count - 1,
                          users: r.users.filter((u) => u !== "John Doe"),
                        }
                      : r,
                  )
                  .filter((r) => r.count > 0),
              }
            } else {
              return {
                ...msg,
                reactions: msg.reactions?.map((r) =>
                  r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, "John Doe"] } : r,
                ),
              }
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { emoji, count: 1, users: ["John Doe"] }],
            }
          }
        }
        return msg
      }),
    )

    toast({
      title: "Reaction added",
      description: `Reacted with ${emoji}`,
    })
  }

  const handleCall = (type: "voice" | "video") => {
    toast({
      title: `${type === "voice" ? "Voice" : "Video"} Call`,
      description: `Starting ${type} call with ${contactName}...`,
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contactAvatar || "/placeholder.svg"} />
                <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
              </Avatar>
              {isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{contactName}</h3>
                {sobrietyBadge && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  >
                    {sobrietyBadge}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isTyping ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="text-blue-500"
                  >
                    typing...
                  </motion.span>
                ) : isOnline ? (
                  "Online"
                ) : (
                  "Last seen recently"
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleCall("voice")}
            >
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleCall("video")}
            >
              <Video className="w-4 h-4" />
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
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex gap-3 ${message.senderId === "me" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={message.senderAvatar || "/placeholder.svg"} />
                <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
              </Avatar>

              <div
                className={`flex flex-col ${message.senderId === "me" ? "items-end" : "items-start"} max-w-xs lg:max-w-md`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.senderId === "me"
                      ? "bg-blue-500 text-white"
                      : message.type === "milestone"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {message.type === "milestone" && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🎉</span>
                      <span className="text-sm font-medium">Milestone Achievement!</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                  {message.senderId === "me" && (
                    <div className="text-gray-500 dark:text-gray-400">
                      {message.isRead ? (
                        <CheckCheck className="w-3 h-3 text-blue-500" />
                      ) : (
                        <Check className="w-3 h-3" />
                      )}
                    </div>
                  )}
                </div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {message.reactions.map((reaction, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                        onClick={() => handleReaction(message.id, reaction.emoji)}
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-gray-600 dark:text-gray-400">{reaction.count}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Quick reactions */}
                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {["❤️", "👍", "😊"].map((emoji) => (
                    <button
                      key={emoji}
                      className="text-sm hover:scale-110 transition-transform"
                      onClick={() => handleReaction(message.id, emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {/* Emoji Picker */}
        <AnimatePresence>
          {isEmojiPickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex gap-2 flex-wrap">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    className="text-xl hover:scale-110 transition-transform p-1"
                    onClick={() => {
                      setNewMessage((prev) => prev + emoji)
                      setIsEmojiPickerOpen(false)
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end gap-2">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <Smile className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1">
            <Textarea
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[40px] max-h-32 resize-none bg-gray-100 dark:bg-gray-700 border-none"
              rows={1}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isSending ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow