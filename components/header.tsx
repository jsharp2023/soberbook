"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Home, Users, MessageCircle, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [userProfile, setUserProfile] = useState<any>(null)
  const { toast } = useToast()
  const [showFriendsList, setShowFriendsList] = useState(false)
  const [friends] = useState([
    { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "online", soberDays: 245 },
    { id: 2, name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40", status: "away", soberDays: 89 },
    { id: 3, name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40", status: "online", soberDays: 156 },
    { id: 4, name: "Alex Rodriguez", avatar: "/placeholder.svg?height=40&width=40", status: "offline", soberDays: 312 },
    { id: 5, name: "Lisa Thompson", avatar: "/placeholder.svg?height=40&width=40", status: "online", soberDays: 78 },
  ])

  // Load user profile on component mount and listen for updates
  useEffect(() => {
    const loadUserProfile = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUserProfile(userData)
      }
    }

    loadUserProfile()

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      loadUserProfile()
    }

    window.addEventListener("profileUpdated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}" in recovery community`,
      })
      // Simulate search
      setTimeout(() => {
        toast({
          title: "Search Results",
          description: `Found 12 results for "${searchQuery}"`,
        })
      }, 1500)
    }
  }

  const handleNotificationClick = () => {
    setNotifications(0)
    toast({
      title: "Notifications",
      description: "You have 3 new notifications from your recovery community",
    })
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    toast({
      title: "Navigation",
      description: `Switched to ${tab} section`,
    })
  }

  // Get display name and avatar from profile
  const displayName = userProfile?.profile?.displayName || userProfile?.name || "User"
  const userAvatar = userProfile?.profile?.avatar || userProfile?.avatar || "/placeholder.svg?height=32&width=32"
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                window.location.href = "/"
                toast({ title: "SoberBook", description: "Welcome to your recovery community!" })
              }}
            >
              <img src="/sober-bok-logo.webp" alt="Sober Bok Logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">SoberBook</span>
            </motion.div>

            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search recovery community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </form>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className={`flex flex-col items-center gap-1 h-12 px-8 backdrop-blur-sm ${
                  activeTab === "home"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => {
                  handleTabClick("home")
                  window.location.href = "/"
                }}
              >
                <Home className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className={`flex flex-col items-center gap-1 h-12 px-8 backdrop-blur-sm ${
                  activeTab === "groups"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => {
                  handleTabClick("groups")
                  setShowFriendsList(true)
                }}
              >
                <Users className="w-6 h-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="lg"
                className={`flex flex-col items-center gap-1 h-12 px-8 backdrop-blur-sm ${
                  activeTab === "messages"
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                }`}
                onClick={() => {
                  handleTabClick("messages")
                  window.location.href = "/messages"
                }}
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </motion.div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 backdrop-blur-sm relative"
                onClick={handleNotificationClick}
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1">
                    <Badge className="w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                      {notifications}
                    </Badge>
                  </motion.div>
                )}
              </Button>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={userAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50"
              >
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  onClick={() => {
                    window.location.href = "/profile"
                    toast({ title: "Profile", description: "Opening your profile page" })
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  onClick={() => toast({ title: "Settings", description: "Opening settings panel" })}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  onClick={() => toast({ title: "Help", description: "Opening help center" })}
                >
                  Help
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  onClick={() => {
                    // Clear user data and redirect to login
                    localStorage.removeItem("user")
                    window.location.reload() // This will trigger the login form to show
                    toast({ title: "Sign Out", description: "You have been signed out safely" })
                  }}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 py-4"
            >
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="Search recovery community..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm border-none text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </form>

              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="justify-start gap-3 text-gray-600 dark:text-gray-300"
                  onClick={() => {
                    handleTabClick("home")
                    setMobileMenuOpen(false)
                    window.location.href = "/"
                  }}
                >
                  <Home className="w-5 h-5" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start gap-3 text-gray-600 dark:text-gray-300"
                  onClick={() => {
                    handleTabClick("groups")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Users className="w-5 h-5" />
                  Groups
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start gap-3 text-gray-600 dark:text-gray-300"
                  onClick={() => {
                    handleTabClick("messages")
                    setMobileMenuOpen(false)
                    window.location.href = "/messages"
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Messages
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Friends List Modal */}
      <Dialog open={showFriendsList} onOpenChange={setShowFriendsList}>
        <DialogContent className="max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Recovery Friends</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => {
                  toast({
                    title: "Opening Chat",
                    description: `Starting conversation with ${friend.name}`,
                  })
                  setShowFriendsList(false)
                }}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {friend.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      friend.status === "online"
                        ? "bg-green-500"
                        : friend.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{friend.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{friend.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{friend.soberDays} days sober</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              variant="outline"
              onClick={() => setShowFriendsList(false)}
              className="text-gray-600 dark:text-gray-300"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Find Friends",
                  description: "Opening friend discovery page",
                })
                setShowFriendsList(false)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Find More Friends
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}
