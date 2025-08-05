"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageIcon, Smile, MapPin, Heart, MessageCircle, Award, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface CreatePostProps {
  onPost: (content: string, type?: string) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState("reflection")
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load current user data
    const loadCurrentUser = () => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setCurrentUser(userData)
      }
    }

    loadCurrentUser()

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      loadCurrentUser()
    }

    window.addEventListener("profileUpdated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [])

  const calculateSobrietyDays = () => {
    if (currentUser?.profile?.sobrietyDate) {
      const sobrietyDate = new Date(currentUser.profile.sobrietyDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return currentUser?.sobrietyDays || 1
  }

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content, postType)
      setContent("")
      setIsExpanded(false)
      toast({
        title: "Post Shared!",
        description: "Your post has been shared with the recovery community.",
      })
    }
  }

  const postTypes = [
    { value: "reflection", label: "Daily Reflection", icon: MessageCircle, color: "bg-blue-500" },
    { value: "milestone", label: "Milestone", icon: Award, color: "bg-green-500" },
    { value: "support", label: "Need Support", icon: Heart, color: "bg-red-500" },
    { value: "celebration", label: "Celebration", icon: Sparkles, color: "bg-purple-500" },
  ]

  const selectedType = postTypes.find((type) => type.value === postType)
  const TypeIcon = selectedType?.icon || MessageCircle

  const displayName = currentUser?.displayName || currentUser?.name || "Anonymous"
  const userAvatar = currentUser?.avatar || currentUser?.profile?.avatar || "/placeholder.svg?height=40&width=40"
  const sobrietyDays = calculateSobrietyDays()
  const currentStep = currentUser?.profile?.currentStep || currentUser?.currentStep || 1

  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 ring-2 ring-blue-500/20">
            <AvatarImage src={userAvatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900 dark:text-gray-100">{displayName}</span>
              <Badge variant="secondary" className="text-xs">
                {sobrietyDays} days • Step {currentStep}
              </Badge>
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder={`What's on your mind, ${displayName.split(" ")[0]}? Share your recovery journey...`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                className="min-h-[80px] resize-none border-none bg-gray-50/50 dark:bg-gray-700/50 focus:bg-white dark:focus:bg-gray-700 transition-colors placeholder:text-gray-500 dark:placeholder:text-gray-400"
                rows={isExpanded ? 4 : 2}
              />

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <TypeIcon className={`w-4 h-4 text-white p-0.5 rounded ${selectedType?.color}`} />
                    <Select value={postType} onValueChange={setPostType}>
                      <SelectTrigger className="w-48 h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {postTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className={`w-4 h-4 text-white p-0.5 rounded ${type.color}`} />
                                {type.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Photo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <Smile className="w-4 h-4 mr-1" />
                        Feeling
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Location
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setContent("")
                          setIsExpanded(false)
                        }}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!content.trim()}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6"
                      >
                        Share
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CreatePost