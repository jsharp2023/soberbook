"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share,
  Award,
  Users,
  Calendar,
  BookOpen,
  Phone,
  Bell,
  Star,
  Edit,
  Trash2,
  Download,
  Upload,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Check,
} from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function FunctionalButtons() {
  // State management for various button interactions
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(47)
  const [followed, setFollowed] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isLocked, setIsLocked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sobrietyDays, setSobrietyDays] = useState(365)
  const [currentStep, setCurrentStep] = useState(4)
  const [meetingCount, setMeetingCount] = useState(47)

  const { toast } = useToast()

  // Helper functions
  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
    toast({
      title: liked ? "Unliked" : "Liked!",
      description: liked ? "Removed from liked posts" : "Added to liked posts",
    })
  }

  const handleFollow = () => {
    setFollowed(!followed)
    toast({
      title: followed ? "Unfollowed" : "Following!",
      description: followed ? "You are no longer following this user" : "You are now following this user",
    })
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      title: bookmarked ? "Removed bookmark" : "Bookmarked!",
      description: bookmarked ? "Removed from saved posts" : "Added to saved posts",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied!",
      description: "Post link copied to clipboard",
    })
  }

  const handleJoinMeeting = () => {
    toast({
      title: "Joining meeting...",
      description: "Redirecting to virtual meeting room",
    })
  }

  const handleMilestone = () => {
    setSobrietyDays((prev) => prev + 1)
    toast({
      title: "Milestone updated!",
      description: `Congratulations on ${sobrietyDays + 1} days sober!`,
    })
  }

  const handleStepProgress = () => {
    if (currentStep < 12) {
      setCurrentStep((prev) => prev + 1)
      toast({
        title: "Step progress!",
        description: `Advanced to Step ${currentStep + 1}`,
      })
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText("Sample recovery text")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    })
  }

  const handleLoadingAction = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    toast({
      title: "Action completed!",
      description: "Your request has been processed",
    })
  }

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">SoberBook Functional Buttons</h1>

      {/* Post Interaction Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Post Interactions</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 mb-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                className={`gap-2 ${liked ? "text-red-500" : "text-gray-600 dark:text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-700`}
                onClick={handleLike}
              >
                <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </motion.div>
                {likeCount}
              </Button>
            </motion.div>

            <Button
              variant="ghost"
              className="gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => toast({ title: "Comments", description: "Opening comments section" })}
            >
              <MessageCircle className="w-5 h-5" />
              Comment
            </Button>

            <Button
              variant="ghost"
              className="gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleShare}
            >
              <Share className="w-5 h-5" />
              Share
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`${bookmarked ? "text-yellow-500" : "text-gray-600 dark:text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-700`}
              onClick={handleBookmark}
            >
              <Star className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Recovery Action Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recovery Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 h-12"
            onClick={handleJoinMeeting}
          >
            <Users className="w-5 h-5 mr-2" />
            Join AA Meeting
          </Button>

          <Button
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 bg-transparent h-12"
            onClick={handleMilestone}
          >
            <Award className="w-5 h-5 mr-2" />
            Update Milestone ({sobrietyDays} days)
          </Button>

          <Button
            variant="outline"
            className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20 bg-transparent h-12"
            onClick={handleStepProgress}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Step {currentStep} Progress
          </Button>

          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent h-12"
            onClick={() => toast({ title: "Crisis Support", description: "Connecting to 24/7 helpline..." })}
          >
            <Phone className="w-5 h-5 mr-2" />
            Crisis Hotline
          </Button>

          <Button
            variant="outline"
            className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20 bg-transparent h-12"
            onClick={() => {
              setMeetingCount((prev) => prev + 1)
              toast({ title: "Meeting logged!", description: `Total meetings: ${meetingCount + 1}` })
            }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Log Meeting ({meetingCount})
          </Button>

          <Button
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20 bg-transparent h-12"
            onClick={() => toast({ title: "Sponsor Connect", description: "Finding available sponsors..." })}
          >
            <Users className="w-5 h-5 mr-2" />
            Find Sponsor
          </Button>
        </div>
      </section>

      {/* Interactive Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Interactive Controls</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={`${notifications ? "text-blue-500" : "text-gray-400"} hover:bg-gray-100 dark:hover:bg-gray-700`}
            onClick={() => {
              setNotifications(!notifications)
              toast({
                title: notifications ? "Notifications off" : "Notifications on",
                description: notifications ? "You won't receive notifications" : "You'll receive notifications",
              })
            }}
          >
            <Bell className={`w-5 h-5 ${notifications ? "fill-current" : ""}`} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setIsPlaying(!isPlaying)
              toast({ title: isPlaying ? "Paused" : "Playing", description: "Meditation audio" })
            }}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setVolume(!volume)
              toast({ title: volume ? "Muted" : "Unmuted", description: "Audio volume" })
            }}
          >
            {volume ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => {
              setIsVisible(!isVisible)
              toast({ title: isVisible ? "Hidden" : "Visible", description: "Content visibility" })
            }}
          >
            {isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </Button>
        </div>
      </section>

      {/* Action Buttons with States */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Action Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button
            variant={followed ? "secondary" : "default"}
            onClick={handleFollow}
            className={followed ? "bg-gray-200 dark:bg-gray-700" : ""}
          >
            <Users className="w-4 h-4 mr-2" />
            {followed ? "Following" : "Follow"}
          </Button>

          <Button variant="outline" onClick={handleCopy} className="bg-transparent">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button onClick={handleLoadingAction} disabled={loading}>
            {loading && <RefreshCw className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Processing..." : "Submit Post"}
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setIsLocked(!isLocked)
              toast({ title: isLocked ? "Unlocked" : "Locked", description: "Privacy settings" })
            }}
            className="bg-transparent"
          >
            {isLocked ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            {isLocked ? "Unlock" : "Lock"}
          </Button>
        </div>
      </section>

      {/* Filter and Sort Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Filters & Navigation</h2>
        <div className="flex flex-wrap gap-2">
          {["all", "aa", "na", "al-anon", "milestones", "meetings"].map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedFilter(filter)
                toast({ title: "Filter applied", description: `Showing ${filter} posts` })
              }}
              className={selectedFilter !== filter ? "bg-transparent" : ""}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setExpanded(!expanded)
              toast({ title: expanded ? "Collapsed" : "Expanded", description: "View mode changed" })
            }}
          >
            {expanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            {expanded ? "Collapse" : "Expand"}
          </Button>

          <Button
            variant="ghost"
            onClick={() => toast({ title: "Refreshing...", description: "Loading latest posts" })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>

          <Button variant="ghost" onClick={() => toast({ title: "Search", description: "Opening search dialog" })}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </section>

      {/* Utility Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Utility Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            onClick={() => toast({ title: "Downloading...", description: "Recovery progress report" })}
            className="bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>

          <Button
            variant="outline"
            onClick={() => toast({ title: "Upload", description: "Select file to upload" })}
            className="bg-transparent"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>

          <Button
            variant="outline"
            onClick={() => toast({ title: "Editing", description: "Edit mode enabled" })}
            className="bg-transparent"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <Button variant="destructive" onClick={() => toast({ title: "Deleted", description: "Item moved to trash" })}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </section>

      {/* Status Display */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Current Status</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={liked ? "default" : "secondary"}>
              Liked: {liked ? "Yes" : "No"} ({likeCount} total)
            </Badge>
            <Badge variant={followed ? "default" : "secondary"}>Following: {followed ? "Yes" : "No"}</Badge>
            <Badge variant={bookmarked ? "default" : "secondary"}>Bookmarked: {bookmarked ? "Yes" : "No"}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Days Sober: {sobrietyDays}</Badge>
            <Badge variant="outline">Current Step: {currentStep}</Badge>
            <Badge variant="outline">Meetings: {meetingCount}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={notifications ? "default" : "secondary"}>
              Notifications: {notifications ? "On" : "Off"}
            </Badge>
            <Badge variant={isLocked ? "destructive" : "default"}>Privacy: {isLocked ? "Locked" : "Open"}</Badge>
            <Badge variant="outline">Filter: {selectedFilter}</Badge>
          </div>
        </div>
      </section>
    </div>
  )
}
