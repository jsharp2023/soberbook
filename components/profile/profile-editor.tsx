"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Edit, Save, X, Shield, Award, Users, Lock, Globe, Palette, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  displayName: string
  email: string
  phone: string
  avatar: string
  coverPhoto: string
  bio: string
  location: string
  sobrietyDate: string
  currentStep: number
  sponsor: string
  homeGroup: string
  programs: string[]
  interests: string[]
  privacySettings: {
    profileVisibility: "public" | "friends" | "private"
    showSobrietyDate: boolean
    showLocation: boolean
    showContact: boolean
    showProgress: boolean
  }
  notificationSettings: {
    sponsorMessages: boolean
    meetingReminders: boolean
    milestoneAlerts: boolean
    friendRequests: boolean
    groupUpdates: boolean
  }
  theme: {
    primaryColor: string
    backgroundStyle: "default" | "gradient" | "pattern"
    fontSize: "small" | "medium" | "large"
  }
}

interface ProfileEditorProps {
  isOpen: boolean
  onClose: () => void
  initialProfile?: Partial<UserProfile>
  onProfileUpdate?: (updatedProfile: UserProfile) => void
}

export function ProfileEditor({ isOpen, onClose, initialProfile, onProfileUpdate }: ProfileEditorProps) {
  const [profile, setProfile] = useState<UserProfile>({
    id: "user_1",
    firstName: "John",
    lastName: "Doe",
    displayName: "John D.",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder.svg?height=120&width=120",
    coverPhoto: "/placeholder.svg?height=200&width=600",
    bio: "One day at a time. Grateful for my recovery journey and the amazing community that supports me.",
    location: "San Francisco, CA",
    sobrietyDate: "2023-01-15",
    currentStep: 4,
    sponsor: "Lisa T.",
    homeGroup: "Morning Serenity AA",
    programs: ["AA", "NA"],
    interests: ["Meditation", "Hiking", "Reading", "Cooking", "Volunteering"],
    privacySettings: {
      profileVisibility: "friends",
      showSobrietyDate: true,
      showLocation: true,
      showContact: false,
      showProgress: true,
    },
    notificationSettings: {
      sponsorMessages: true,
      meetingReminders: true,
      milestoneAlerts: true,
      friendRequests: true,
      groupUpdates: false,
    },
    theme: {
      primaryColor: "#3B82F6",
      backgroundStyle: "default",
      fontSize: "medium",
    },
    ...initialProfile,
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const recoveryPrograms = ["AA", "NA", "Al-Anon", "CA", "SMART Recovery", "LifeRing", "SOS"]
  const availableInterests = [
    "Meditation",
    "Yoga",
    "Hiking",
    "Reading",
    "Cooking",
    "Art",
    "Music",
    "Volunteering",
    "Fitness",
    "Gardening",
    "Photography",
    "Writing",
    "Travel",
    "Movies",
    "Gaming",
  ]

  const themeColors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Green", value: "#10B981" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Teal", value: "#14B8A6" },
  ]

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update localStorage with new profile data
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
    const updatedUser = {
      ...currentUser,
      profile: profile,
      name: profile.displayName,
      displayName: profile.displayName,
      avatar: profile.avatar,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      bio: profile.bio,
      location: profile.location,
      sobrietyDate: profile.sobrietyDate,
      currentStep: profile.currentStep,
      sponsor: profile.sponsor,
      homeGroup: profile.homeGroup,
      programs: profile.programs,
      interests: profile.interests,
    }

    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Call the callback to update parent components
    if (onProfileUpdate) {
      onProfileUpdate(profile)
    }

    setIsSaving(false)
    setIsEditing(false)

    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated across SoberBook.",
    })

    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { profile, user: updatedUser } }))
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }))
        setIsEditing(true)
      }
      reader.readAsDataURL(file)

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated.",
      })
    }
  }

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, coverPhoto: e.target?.result as string }))
        setIsEditing(true)
      }
      reader.readAsDataURL(file)

      toast({
        title: "Cover Photo Updated",
        description: "Your cover photo has been updated.",
      })
    }
  }

  const toggleInterest = (interest: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
    setIsEditing(true)
  }

  const toggleProgram = (program: string) => {
    setProfile((prev) => ({
      ...prev,
      programs: prev.programs.includes(program)
        ? prev.programs.filter((p) => p !== program)
        : [...prev.programs, program],
    }))
    setIsEditing(true)
  }

  const calculateSobrietyDays = () => {
    const sobrietyDate = new Date(profile.sobrietyDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h2>
              <p className="text-gray-500 dark:text-gray-400">Customize your SoberBook profile and settings</p>
            </div>
            <div className="flex items-center gap-2">
              {isEditing && (
                <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              )}
              <Button variant="ghost" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex w-full">
            <TabsList className="flex flex-col h-full w-48 bg-gray-50 dark:bg-gray-900 p-2 space-y-1">
              <TabsTrigger value="basic" className="w-full justify-start">
                <Edit className="w-4 h-4 mr-2" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="recovery" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Recovery
              </TabsTrigger>
              <TabsTrigger value="privacy" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="w-full justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Appearance
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="p-6 space-y-6">
                {/* Cover Photo */}
                <Card>
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg overflow-hidden">
                      <img
                        src={profile.coverPhoto || "/placeholder.svg?height=200&width=600"}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-4 right-4"
                        onClick={() => coverInputRef.current?.click()}
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Change Cover
                      </Button>
                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden"
                      />
                    </div>

                    {/* Avatar */}
                    <div className="relative -mt-16 ml-6 mb-4">
                      <div className="relative">
                        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800">
                          <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-2xl">
                            {profile.firstName.charAt(0)}
                            {profile.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute bottom-0 right-0 rounded-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                        <Input
                          value={profile.firstName}
                          onChange={(e) => {
                            setProfile((prev) => ({ ...prev, firstName: e.target.value }))
                            setIsEditing(true)
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                        <Input
                          value={profile.lastName}
                          onChange={(e) => {
                            setProfile((prev) => ({ ...prev, lastName: e.target.value }))
                            setIsEditing(true)
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                      <Input
                        value={profile.displayName}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, displayName: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                        placeholder="How you want to appear to others"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, bio: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                        placeholder="Tell others about your recovery journey..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <Input
                          type="email"
                          value={profile.email}
                          onChange={(e) => {
                            setProfile((prev) => ({ ...prev, email: e.target.value }))
                            setIsEditing(true)
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <Input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => {
                            setProfile((prev) => ({ ...prev, phone: e.target.value }))
                            setIsEditing(true)
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                      <Input
                        value={profile.location}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, location: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                        placeholder="City, State"
                      />
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                        Interests & Hobbies
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {availableInterests.map((interest) => (
                          <Badge
                            key={interest}
                            variant={profile.interests.includes(interest) ? "default" : "outline"}
                            className={`cursor-pointer transition-colors ${
                              profile.interests.includes(interest)
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => {
                              toggleInterest(interest)
                            }}
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recovery Tab */}
              <TabsContent value="recovery" className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Recovery Journey
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sobriety Date</label>
                      <Input
                        type="date"
                        value={profile.sobrietyDate}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, sobrietyDate: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {calculateSobrietyDays()} days sober • {Math.floor(calculateSobrietyDays() / 30)} months
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Step</label>
                      <Select
                        value={profile.currentStep.toString()}
                        onValueChange={(value) => {
                          setProfile((prev) => ({ ...prev, currentStep: Number.parseInt(value) }))
                          setIsEditing(true)
                        }}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map((step) => (
                            <SelectItem key={step} value={step.toString()}>
                              Step {step}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sponsor</label>
                      <Input
                        value={profile.sponsor}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, sponsor: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                        placeholder="Your sponsor's name"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Home Group</label>
                      <Input
                        value={profile.homeGroup}
                        onChange={(e) => {
                          setProfile((prev) => ({ ...prev, homeGroup: e.target.value }))
                          setIsEditing(true)
                        }}
                        className="mt-1"
                        placeholder="Your regular meeting group"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                        Recovery Programs
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {recoveryPrograms.map((program) => (
                          <Badge
                            key={program}
                            variant={profile.programs.includes(program) ? "default" : "outline"}
                            className={`cursor-pointer transition-colors ${
                              profile.programs.includes(program)
                                ? "bg-green-500 text-white"
                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                            onClick={() => {
                              toggleProgram(program)
                            }}
                          >
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Visibility</label>
                      <Select
                        value={profile.privacySettings.profileVisibility}
                        onValueChange={(value: "public" | "friends" | "private") => {
                          setProfile((prev) => ({
                            ...prev,
                            privacySettings: { ...prev.privacySettings, profileVisibility: value },
                          }))
                          setIsEditing(true)
                        }}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              Public - Anyone can see
                            </div>
                          </SelectItem>
                          <SelectItem value="friends">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Friends Only
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Private - Only me
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Show Sobriety Date</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Display your sobriety date and progress
                          </p>
                        </div>
                        <Switch
                          checked={profile.privacySettings.showSobrietyDate}
                          onCheckedChange={(checked) => {
                            setProfile((prev) => ({
                              ...prev,
                              privacySettings: { ...prev.privacySettings, showSobrietyDate: checked },
                            }))
                            setIsEditing(true)
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Show Location</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Display your city and state</p>
                        </div>
                        <Switch
                          checked={profile.privacySettings.showLocation}
                          onCheckedChange={(checked) => {
                            setProfile((prev) => ({
                              ...prev,
                              privacySettings: { ...prev.privacySettings, showLocation: checked },
                            }))
                            setIsEditing(true)
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Show Contact Info</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Display email and phone number</p>
                        </div>
                        <Switch
                          checked={profile.privacySettings.showContact}
                          onCheckedChange={(checked) => {
                            setProfile((prev) => ({
                              ...prev,
                              privacySettings: { ...prev.privacySettings, showContact: checked },
                            }))
                            setIsEditing(true)
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Show Recovery Progress</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Display current step and recovery milestones
                          </p>
                        </div>
                        <Switch
                          checked={profile.privacySettings.showProgress}
                          onCheckedChange={(checked) => {
                            setProfile((prev) => ({
                              ...prev,
                              privacySettings: { ...prev.privacySettings, showProgress: checked },
                            }))
                            setIsEditing(true)
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Sponsor Messages</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          High priority notifications from your sponsor
                        </p>
                      </div>
                      <Switch
                        checked={profile.notificationSettings.sponsorMessages}
                        onCheckedChange={(checked) => {
                          setProfile((prev) => ({
                            ...prev,
                            notificationSettings: { ...prev.notificationSettings, sponsorMessages: checked },
                          }))
                          setIsEditing(true)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Meeting Reminders</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notifications for upcoming AA/NA meetings
                        </p>
                      </div>
                      <Switch
                        checked={profile.notificationSettings.meetingReminders}
                        onCheckedChange={(checked) => {
                          setProfile((prev) => ({
                            ...prev,
                            notificationSettings: { ...prev.notificationSettings, meetingReminders: checked },
                          }))
                          setIsEditing(true)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Milestone Alerts</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Celebrate sobriety milestones and achievements
                        </p>
                      </div>
                      <Switch
                        checked={profile.notificationSettings.milestoneAlerts}
                        onCheckedChange={(checked) => {
                          setProfile((prev) => ({
                            ...prev,
                            notificationSettings: { ...prev.notificationSettings, milestoneAlerts: checked },
                          }))
                          setIsEditing(true)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Friend Requests</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Notifications when someone wants to connect
                        </p>
                      </div>
                      <Switch
                        checked={profile.notificationSettings.friendRequests}
                        onCheckedChange={(checked) => {
                          setProfile((prev) => ({
                            ...prev,
                            notificationSettings: { ...prev.notificationSettings, friendRequests: checked },
                          }))
                          setIsEditing(true)
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Group Updates</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Updates from your recovery groups and meetings
                        </p>
                      </div>
                      <Switch
                        checked={profile.notificationSettings.groupUpdates}
                        onCheckedChange={(checked) => {
                          setProfile((prev) => ({
                            ...prev,
                            notificationSettings: { ...prev.notificationSettings, groupUpdates: checked },
                          }))
                          setIsEditing(true)
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="p-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Appearance Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                        Primary Color
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {themeColors.map((color) => (
                          <button
                            key={color.value}
                            className={`w-12 h-12 rounded-full border-4 transition-all ${
                              profile.theme.primaryColor === color.value
                                ? "border-gray-900 dark:border-gray-100 scale-110"
                                : "border-gray-300 dark:border-gray-600 hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => {
                              setProfile((prev) => ({
                                ...prev,
                                theme: { ...prev.theme, primaryColor: color.value },
                              }))
                              setIsEditing(true)
                            }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Background Style</label>
                      <Select
                        value={profile.theme.backgroundStyle}
                        onValueChange={(value: "default" | "gradient" | "pattern") => {
                          setProfile((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, backgroundStyle: value },
                          }))
                          setIsEditing(true)
                        }}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="gradient">Gradient</SelectItem>
                          <SelectItem value="pattern">Pattern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
                      <Select
                        value={profile.theme.fontSize}
                        onValueChange={(value: "small" | "medium" | "large") => {
                          setProfile((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, fontSize: value },
                          }))
                          setIsEditing(true)
                        }}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Preview */}
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Preview</h4>
                      <div
                        className="p-4 rounded-lg text-white"
                        style={{ backgroundColor: profile.theme.primaryColor }}
                      >
                        <h5
                          className={`font-semibold ${
                            profile.theme.fontSize === "small"
                              ? "text-sm"
                              : profile.theme.fontSize === "large"
                                ? "text-lg"
                                : "text-base"
                          }`}
                        >
                          {profile.displayName}
                        </h5>
                        <p
                          className={`opacity-90 ${
                            profile.theme.fontSize === "small"
                              ? "text-xs"
                              : profile.theme.fontSize === "large"
                                ? "text-base"
                                : "text-sm"
                          }`}
                        >
                          {calculateSobrietyDays()} days sober • Step {profile.currentStep}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProfileEditor