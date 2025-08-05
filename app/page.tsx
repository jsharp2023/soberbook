"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { NewsFeed } from "@/components/news-feed"
import { RightSidebar } from "@/components/right-sidebar"
import { ParallaxBackground } from "@/components/parallax-background"
import { SponsorNotificationSystem } from "@/components/sponsor/sponsor-notification-system"
import { SponsorAlertWidget } from "@/components/sponsor/sponsor-alert-widget"
import { SponsorEmergencyButton } from "@/components/sponsor/sponsor-emergency-button"
import {LoginForm} from "@/components/auth/login-form"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme()
  const [showSponsorNotifications, setShowSponsorNotifications] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData: any) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading SoberBook...</p>
        </div>
      </div>
    )
  }

  // Show login form if user is not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />

      <div className="relative z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm min-h-screen transition-colors duration-500">
        <Header />
        <div className="max-w-7xl mx-auto flex gap-6 pt-4 px-4">
          <div className="hidden lg:block w-80">
            <Sidebar />
          </div>
          <div className="flex-1 max-w-2xl">
            <NewsFeed />
          </div>
          <div className="hidden xl:block w-80">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Sponsor Communication System */}
      <SponsorAlertWidget onOpenNotifications={() => setShowSponsorNotifications(true)} />

      <SponsorNotificationSystem
        isVisible={showSponsorNotifications}
        onClose={() => setShowSponsorNotifications(false)}
      />

      <SponsorEmergencyButton
        sponsorName="Lisa T."
        sponsorPhone="(555) 123-4567"
        backupContacts={[
          { name: "Mike C.", phone: "(555) 234-5678", relationship: "Recovery Friend" },
          { name: "Emma R.", phone: "(555) 345-6789", relationship: "Group Member" },
          { name: "AA Hotline", phone: "(212) 870-3400", relationship: "24/7 Support" },
        ]}
      />
    </div>
  )
}

