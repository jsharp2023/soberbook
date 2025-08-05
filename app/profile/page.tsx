"use client"


import { useState, useEffect } from "react"
import { ProfileView } from "@/components/profile/profile-view"
import { ProfileEditor } from "@/components/profile/profile-editor"
import { ParallaxBackground } from "@/components/parallax-background"
import { Header } from "@/components/header"

export default function ProfilePage() {
  const [showEditor, setShowEditor] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadUserProfile()

    // Listen for profile updates
    const handleProfileUpdate = () => {
      loadUserProfile()
    }

    window.addEventListener("profileUpdated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [])

  const loadUserProfile = () => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUserProfile(userData)
    }
  }

  const handleProfileUpdate = (updatedProfile: any) => {
    loadUserProfile() // Reload from localStorage to get the latest data
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground />

      <div className="relative z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm min-h-screen transition-colors duration-500">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProfileView userId="user_1" isOwnProfile={true} onEditProfile={() => setShowEditor(true)} />
        </div>
      </div>

      <ProfileEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        initialProfile={userProfile?.profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  )
}
