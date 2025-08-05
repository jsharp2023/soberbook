"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Contact {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  sobrietyBadge?: string
  mutualConnections: number
  lastActive: string
}

interface NewChatModalProps {
  isOpen: boolean
  onClose: () => void
  onStartChat: (contactId: string) => void
}

export function NewChatModal({ isOpen, onClose, onStartChat }: NewChatModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const { toast } = useToast()

  const availableContacts: Contact[] = [
    {
      id: "6",
      name: "Alex K.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      sobrietyBadge: "8 months",
      mutualConnections: 3,
      lastActive: "Online",
    },
    {
      id: "7",
      name: "Lisa T.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      sobrietyBadge: "4 years",
      mutualConnections: 7,
      lastActive: "2h ago",
    },
    {
      id: "8",
      name: "Mark R.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      sobrietyBadge: "1 year",
      mutualConnections: 2,
      lastActive: "Online",
    },
    {
      id: "9",
      name: "Jennifer S.",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: false,
      sobrietyBadge: "6 months",
      mutualConnections: 5,
      lastActive: "1d ago",
    },
    {
      id: "10",
      name: "Recovery Newcomers",
      avatar: "/placeholder.svg?height=40&width=40",
      isOnline: true,
      mutualConnections: 12,
      lastActive: "Active group",
    },
  ]

  const filteredContacts = availableContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactSelect = (contactId: string) => {
    if (isCreatingGroup) {
      setSelectedContacts((prev) =>
        prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
      )
    } else {
      onStartChat(contactId)
      toast({
        title: "Chat started",
        description: `Started conversation with ${availableContacts.find((c) => c.id === contactId)?.name}`,
      })
    }
  }

  const handleCreateGroup = () => {
    if (selectedContacts.length < 2) {
      toast({
        title: "Group chat requires at least 2 members",
        description: "Please select more contacts to create a group",
        variant: "destructive",
      })
      return
    }

    const groupId = `group_${Date.now()}`
    onStartChat(groupId)
    toast({
      title: "Group chat created",
      description: `Created group with ${selectedContacts.length} members`,
    })
  }

  const handleClose = () => {
    setSearchQuery("")
    setSelectedContacts([])
    setIsCreatingGroup(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {isCreatingGroup ? "Create Group Chat" : "Start New Chat"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search recovery community..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Toggle Group Mode */}
          <div className="flex gap-2">
            <Button
              variant={!isCreatingGroup ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setIsCreatingGroup(false)
                setSelectedContacts([])
              }}
              className="flex-1"
            >
              Direct Message
            </Button>
            <Button
              variant={isCreatingGroup ? "default" : "outline"}
              size="sm"
              onClick={() => setIsCreatingGroup(true)}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-1" />
              Group Chat
            </Button>
          </div>

          {/* Selected Contacts (Group Mode) */}
          {isCreatingGroup && selectedContacts.length > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">
                Selected ({selectedContacts.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedContacts.map((contactId) => {
                  const contact = availableContacts.find((c) => c.id === contactId)
                  return (
                    <Badge
                      key={contactId}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300"
                    >
                      {contact?.name}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {/* Contacts List */}
          <div className="max-h-64 overflow-y-auto space-y-2">
            <AnimatePresence>
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContacts.includes(contact.id)
                      ? "bg-blue-100 dark:bg-blue-900/30"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleContactSelect(contact.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{contact.name}</h4>
                        {contact.sobrietyBadge && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          >
                            {contact.sobrietyBadge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {contact.mutualConnections} mutual connections
                        </p>
                        <span className="text-xs text-gray-400">{contact.lastActive}</span>
                      </div>
                    </div>

                    {isCreatingGroup && (
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedContacts.includes(contact.id)
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {selectedContacts.includes(contact.id) && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Actions */}
          {isCreatingGroup && (
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} disabled={selectedContacts.length < 2} className="flex-1">
                Create Group ({selectedContacts.length})
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewChatModal