"use client"

import { useState } from "react"
import { ChatSidebar } from "./chat-sidebar"
import { ChatWindow } from "./chat-window"
import { NewChatModal } from "./new-chat-modal"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function MessagingLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showNewChatModal, setShowNewChatModal] = useState(false)

  // Mock contact data - in real app this would come from props or API
  const contactData = {
    "1": {
      name: "Sarah M. (Sponsor)",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      sobrietyBadge: "5 years",
      isTyping: false,
    },
    "2": {
      name: "Mike C.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      sobrietyBadge: "2 years",
      isTyping: true,
    },
    "3": {
      name: "Emma R.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      sobrietyBadge: "1 year",
      isTyping: false,
    },
    "4": {
      name: "Recovery Group Chat",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      isTyping: false,
    },
    "5": {
      name: "David W.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      sobrietyBadge: "3 years",
      isTyping: false,
    },
  }

  const selectedContact = selectedChat ? contactData[selectedChat as keyof typeof contactData] : null

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-gray-100 dark:bg-gray-900">
      <ChatSidebar
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        onStartNewChat={() => setShowNewChatModal(true)}
      />

      {selectedChat && selectedContact ? (
        <ChatWindow
          chatId={selectedChat}
          contactName={selectedContact.name}
          contactAvatar={selectedContact.avatar}
          isOnline={selectedContact.isOnline}
          sobrietyBadge={selectedContact.sobrietyBadge}
          isTyping={selectedContact.isTyping}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Welcome to SoberBook Messages</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
              Connect with your recovery community. Share experiences, offer support, and stay connected with your
              sponsor and friends.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>💬 Private messaging with end-to-end encryption</p>
              <p>🎯 Recovery-focused conversations</p>
              <p>👥 Group chats for meetings and support</p>
              <p>📞 Voice and video calling</p>
            </div>
          </motion.div>
        </div>
      )}

      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onStartChat={(contactId) => {
          setSelectedChat(contactId)
          setShowNewChatModal(false)
        }}
      />
    </div>
  )
}


