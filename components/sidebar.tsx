"use client"

import { useState, useEffect } from "react"
import { Home, Users, Clock, Bookmark, Calendar, Video, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home")
  const [shortcutsExpanded, setShortcutsExpanded] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [userStats, setUserStats] = useState({
    daysSober: 365,
    meetingsAttended: 47,
    currentStep: 4,
  })
  const { toast } = useToast()

  const calculateSobrietyDays = (sobrietyDate: string) => {
    if (!sobrietyDate) return 365 // fallback
    const sobriety = new Date(sobrietyDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - sobriety.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  useEffect(() => {
    const loadUserProfile = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUserProfile(userData)

        // Update user stats with profile data
        const daysSober = userData.profile?.sobrietyDate
          ? calculateSobrietyDays(userData.profile.sobrietyDate)
          : userData.sobrietyDate
            ? calculateSobrietyDays(userData.sobrietyDate)
            : 365

        setUserStats((prev) => ({
          ...prev,
          daysSober,
          currentStep: userData.profile?.currentStep || userData.currentStep || 4,
        }))
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

  const menuItems = [
    { icon: Home, label: "Home", count: null },
    { icon: Users, label: "My Meetings", count: 3 },
    { icon: Clock, label: "Sobriety Counter", count: null },
    { icon: Bookmark, label: "Daily Reflections", count: 1 },
    { icon: Calendar, label: "Meeting Schedule", count: 5 },
    { icon: Video, label: "Virtual Meetings", count: 2 },
  ]

  const shortcuts = [
    { name: "Local AA Group", color: "bg-blue-500", code: "AA", members: 24 },
    { name: "NA Fellowship", color: "bg-green-500", code: "NA", members: 18 },
    { name: "Al-Anon Support", color: "bg-purple-500", code: "AL", members: 31 },
  ]

  const handleMenuClick = (label: string) => {
    setActiveItem(label)
    toast({
      title: `${label}`,
      description: `Navigating to ${label} section`,
    })
  }

  const handleShortcutClick = (name: string, members: number) => {
    toast({
      title: `${name}`,
      description: `Joining group with ${members} active members`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="space-y-2">
        {/* User Profile */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() =>
              toast({
                title: userProfile?.profile?.displayName || userProfile?.name || "User",
                description: `${userStats.daysSober} days sober • Step ${userStats.currentStep} • ${userStats.meetingsAttended} meetings`,
              })
            }
          >
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={userProfile?.profile?.avatar || userProfile?.avatar || "/placeholder.svg?height=32&width=32"}
              />
              <AvatarFallback>
                {(userProfile?.profile?.displayName || userProfile?.name || "User")
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="font-medium">{userProfile?.profile?.displayName || userProfile?.name || "User"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{userStats.daysSober} days sober</div>
            </div>
          </Button>
        </motion.div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={activeItem === item.label ? "secondary" : "ghost"}
              className={`w-full justify-between gap-3 h-12 ${
                activeItem === item.label
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleMenuClick(item.label)}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>{item.label}</span>
              </div>
              {item.count && (
                <Badge variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {item.count}
                </Badge>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <motion.div
          className="flex items-center justify-between mb-3 cursor-pointer"
          onClick={() => setShortcutsExpanded(!shortcutsExpanded)}
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">Your Shortcuts</h3>
          <motion.div animate={{ rotate: shortcutsExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {shortcutsExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {shortcuts.map((shortcut, index) => (
                <motion.div
                  key={shortcut.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-between gap-3 h-10 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleShortcutClick(shortcut.name, shortcut.members)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 ${shortcut.color} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{shortcut.code}</span>
                      </div>
                      <span className="text-sm">{shortcut.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {shortcut.members}
                    </Badge>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.daysSober}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Days Sober</div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-gray-500 dark:text-gray-400">Step {userStats.currentStep}</span>
              <span className="text-gray-500 dark:text-gray-400">{userStats.meetingsAttended} meetings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
