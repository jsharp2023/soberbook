"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Edit,
  MapPin,
  Calendar,
  Award,
  Heart,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Target,
  BookOpen,
  Coffee,
} from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface ProfileViewProps {
  userId: string
  isOwnProfile?: boolean
  onEditProfile?: () => void
}

export function ProfileView({ userId, isOwnProfile = false, onEditProfile }: ProfileViewProps) {
  const [profile, setProfile] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    loadProfile()

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      loadProfile()
    }

    window.addEventListener("profileUpdated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [userId])

  const loadProfile = () => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)

      // Use profile data if available, otherwise fall back to user data
      const profileData = userData.profile || {
        id: userData.id || "user_1",
        firstName: userData.firstName || "John",
        lastName: userData.lastName || "Doe",
        displayName: userData.displayName || userData.name || "John D.",
        email: userData.email || "john.doe@email.com",
        phone: userData.phone || "(555) 123-4567",
        avatar: userData.avatar || "/placeholder.svg?height=120&width=120",
        coverPhoto: userData.coverPhoto || "/placeholder.svg?height=200&width=600",
        bio:
          userData.bio ||
          "One day at a time. Grateful for my recovery journey and the amazing community that supports me.",
        location: userData.location || "San Francisco, CA",
        sobrietyDate: userData.sobrietyDate || "2023-01-15",
        currentStep: userData.currentStep || 4,
        sponsor: userData.sponsor || "Lisa T.",
        homeGroup: userData.homeGroup || "Morning Serenity AA",
        programs: userData.programs || ["AA", "NA"],
        interests: userData.interests || ["Meditation", "Hiking", "Reading", "Cooking", "Volunteering"],
        privacySettings: userData.privacySettings || {
          profileVisibility: "friends",
          showSobrietyDate: true,
          showLocation: true,
          showContact: false,
          showProgress: true,
        },
        theme: userData.theme || {
          primaryColor: "#3B82F6",
          backgroundStyle: "default",
          fontSize: "medium",
        },
      }

      setProfile(profileData)
    }
  }

  const calculateSobrietyDays = () => {
    if (!profile?.sobrietyDate) return 0
    const sobrietyDate = new Date(profile.sobrietyDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateSobrietyMonths = () => {
    return Math.floor(calculateSobrietyDays() / 30)
  }

  const calculateSobrietyYears = () => {
    return Math.floor(calculateSobrietyDays() / 365)
  }

  if (!mounted || !profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    )
  }

  const sobrietyDays = calculateSobrietyDays()
  const sobrietyMonths = calculateSobrietyMonths()
  const sobrietyYears = calculateSobrietyYears()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cover Photo and Profile Header */}
      <Card className="overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <img src={profile.coverPhoto || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-xl">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {profile.firstName?.charAt(0)}
                  {profile.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{profile.displayName}</h1>
                <div className="flex flex-wrap gap-2">
                  {profile.privacySettings?.showSobrietyDate && (
                    <Badge className="bg-green-500 text-white">
                      <Calendar className="w-3 h-3 mr-1" />
                      {sobrietyDays} days sober
                    </Badge>
                  )}
                  {profile.privacySettings?.showProgress && (
                    <Badge className="bg-blue-500 text-white">
                      <Award className="w-3 h-3 mr-1" />
                      Step {profile.currentStep}
                    </Badge>
                  )}
                  {profile.privacySettings?.showLocation && profile.location && (
                    <Badge variant="secondary">
                      <MapPin className="w-3 h-3 mr-1" />
                      {profile.location}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {isOwnProfile && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={onEditProfile} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </div>

          {profile.bio && (
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">{profile.bio}</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Recovery Stats */}
        <div className="space-y-6">
          {/* Recovery Progress */}
          {profile.privacySettings?.showProgress && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Recovery Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.privacySettings?.showSobrietyDate && (
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{sobrietyDays}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Days Sober</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {sobrietyYears > 0 && `${sobrietyYears} year${sobrietyYears > 1 ? "s" : ""} `}
                      {sobrietyMonths % 12} month{sobrietyMonths % 12 !== 1 ? "s" : ""}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Current Step</span>
                    <Badge className="bg-blue-500 text-white">Step {profile.currentStep}</Badge>
                  </div>

                  {profile.sponsor && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Sponsor</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.sponsor}</span>
                    </div>
                  )}

                  {profile.homeGroup && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Home Group</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{profile.homeGroup}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Programs */}
          {profile.programs && profile.programs.length > 0 && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Recovery Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.programs.map((program: string) => (
                    <Badge key={program} className="bg-purple-500 text-white">
                      {program}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Info */}
          {profile.privacySettings?.showContact && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{profile.phone}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interests & Hobbies */}
          {profile.interests && profile.interests.length > 0 && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Heart className="w-5 h-5 text-red-500" />
                  Interests & Hobbies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest: string) => (
                    <Badge key={interest} variant="outline" className="text-gray-700 dark:text-gray-300">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity Placeholder */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Star className="w-5 h-5 text-yellow-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <Coffee className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Recent posts and activities will appear here</p>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          {profile.privacySettings?.showSobrietyDate && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Target className="w-5 h-5 text-green-500" />
                  Recovery Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sobrietyDays >= 30 && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">30 Days Milestone</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          First month of sobriety achieved!
                        </div>
                      </div>
                    </div>
                  )}

                  {sobrietyDays >= 90 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">90 Days Milestone</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Three months strong!</div>
                      </div>
                    </div>
                  )}

                  {sobrietyDays >= 365 && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">One Year Milestone</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">A full year of recovery!</div>
                      </div>
                    </div>
                  )}

                  {sobrietyDays < 30 && (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Keep going! Your first milestone is coming up.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
