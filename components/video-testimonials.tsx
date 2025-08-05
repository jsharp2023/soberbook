"use client"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Video, Play, Square, Upload, Heart, MessageCircle, Share, Camera, Mic, MicOff } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedButton } from "@/components/animated-button"
import { useToast } from "@/hooks/use-toast"

interface VideoTestimonial {
  id: string
  user: {
    name: string
    avatar: string
    sobrietyBadge: string
    verified: boolean
  }
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  category: "milestone" | "daily" | "inspiration" | "advice"
}

const testimonials: VideoTestimonial[] = [
  {
    id: "1",
    user: {
      name: "Sarah M.",
      avatar: "/placeholder.svg?height=40&width=40",
      sobrietyBadge: "6 months",
      verified: true,
    },
    title: "My 6-Month Journey",
    description: "Sharing my experience of reaching 6 months sober and the challenges I overcame.",
    videoUrl: "/placeholder-video.mp4",
    thumbnail: "/placeholder.svg?height=200&width=300&text=6+Month+Journey",
    duration: "3:45",
    timestamp: "2 days ago",
    likes: 127,
    comments: 23,
    shares: 8,
    category: "milestone",
  },
  {
    id: "2",
    user: {
      name: "Mike C.",
      avatar: "/placeholder.svg?height=40&width=40",
      sobrietyBadge: "2 years",
      verified: false,
    },
    title: "Daily Meditation Practice",
    description: "How daily meditation transformed my recovery and helped me stay centered.",
    videoUrl: "/placeholder-video.mp4",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Meditation+Practice",
    duration: "5:12",
    timestamp: "1 week ago",
    likes: 89,
    comments: 15,
    shares: 12,
    category: "daily",
  },
  {
    id: "3",
    user: {
      name: "Emma R.",
      avatar: "/placeholder.svg?height=40&width=40",
      sobrietyBadge: "1 year",
      verified: true,
    },
    title: "Finding Hope Again",
    description: "A message of hope for anyone struggling - you are not alone in this journey.",
    videoUrl: "/placeholder-video.mp4",
    thumbnail: "/placeholder.svg?height=200&width=300&text=Finding+Hope",
    duration: "2:30",
    timestamp: "3 days ago",
    likes: 203,
    comments: 45,
    shares: 28,
    category: "inspiration",
  },
]

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    title: "",
    description: "",
    category: "daily" as VideoTestimonial["category"],
  })
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const recordingInterval = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const categoryColors = {
    milestone: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    daily: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    inspiration: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    advice: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setIsRecording(true)
      setRecordingTime(0)

      recordingInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      toast({
        title: "Recording Started",
        description: "Share your recovery story with the community",
      })
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access to record testimonials",
        variant: "destructive",
      })
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current)
    }
    setShowUploadDialog(true)

    toast({
      title: "Recording Stopped",
      description: "Add details to share your testimonial",
    })
  }

  const handleUpload = () => {
    if (!newTestimonial.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title for your testimonial",
        variant: "destructive",
      })
      return
    }

    // Simulate upload
    toast({
      title: "Testimonial Uploaded!",
      description: "Your video testimonial has been shared with the community",
    })

    setShowUploadDialog(false)
    setNewTestimonial({ title: "", description: "", category: "daily" })
    setRecordingTime(0)
  }

  const handleVideoPlay = (testimonialId: string) => {
    setIsPlaying(testimonialId)
    toast({
      title: "Playing Video",
      description: "Watching testimonial",
    })
  }

  const handleVideoLike = (testimonialId: string) => {
    toast({
      title: "Testimonial Liked",
      description: "Showing support for this recovery story",
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AnimatedCard className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardContent className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Video className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Video Testimonials</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share your recovery journey</p>
            </div>
          </div>

          {/* Record Button */}
          <Dialog>
            <DialogTrigger asChild>
              <AnimatedButton className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <Camera className="w-4 h-4" />
                Record Story
              </AnimatedButton>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Record Your Testimonial
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Recording Area */}
                <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  {isRecording ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <div className="w-6 h-6 bg-white rounded-full" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Recording: {formatTime(recordingTime)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Share your story...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Ready to Record</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Click start to begin recording</p>
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex items-center justify-center gap-4">
                  {!isRecording ? (
                    <AnimatedButton onClick={startRecording} className="bg-red-600 hover:bg-red-700 text-white gap-2">
                      <Camera className="w-4 h-4" />
                      Start Recording
                    </AnimatedButton>
                  ) : (
                    <div className="flex gap-2">
                      <AnimatedButton
                        onClick={stopRecording}
                        className="bg-gray-600 hover:bg-gray-700 text-white gap-2"
                      >
                        <Square className="w-4 h-4" />
                        Stop Recording
                      </AnimatedButton>
                      <AnimatedButton onClick={() => setIsMuted(!isMuted)} variant="outline" className="gap-2">
                        {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        {isMuted ? "Unmute" : "Mute"}
                      </AnimatedButton>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideo(testimonial)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 aspect-video mb-3">
                <img
                  src={testimonial.thumbnail || "/placeholder.svg"}
                  alt={testimonial.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {testimonial.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <Badge className={`text-xs ${categoryColors[testimonial.category]}`}>{testimonial.category}</Badge>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={testimonial.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{testimonial.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {testimonial.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{testimonial.user.name}</span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      >
                        {testimonial.user.sobrietyBadge}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{testimonial.timestamp}</p>
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {testimonial.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {testimonial.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share className="w-3 h-3" />
                    {testimonial.shares}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Share Your Testimonial
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Title</label>
                <Input
                  placeholder="Give your testimonial a title..."
                  value={newTestimonial.title}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe what you shared in your video..."
                  value={newTestimonial.description}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(categoryColors).map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setNewTestimonial({ ...newTestimonial, category: category as VideoTestimonial["category"] })
                      }
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        newTestimonial.category === category
                          ? categoryColors[category as keyof typeof categoryColors]
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <AnimatedButton variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                  Cancel
                </AnimatedButton>
                <AnimatedButton onClick={handleUpload} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  Share Testimonial
                </AnimatedButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Player Modal */}
        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={selectedVideo.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedVideo.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{selectedVideo.user.name}</span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      >
                        {selectedVideo.user.sobrietyBadge}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">{selectedVideo.title}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Video Player */}
                <div className="relative bg-black rounded-lg aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Video Player</p>
                      <p className="text-sm opacity-75">Duration: {selectedVideo.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Video Description */}
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300">{selectedVideo.description}</p>

                  {/* Engagement Actions */}
                  <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <AnimatedButton
                      variant="ghost"
                      onClick={() => handleVideoLike(selectedVideo.id)}
                      className="gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                      {selectedVideo.likes} Likes
                    </AnimatedButton>
                    <AnimatedButton
                      variant="ghost"
                      className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {selectedVideo.comments} Comments
                    </AnimatedButton>
                    <AnimatedButton
                      variant="ghost"
                      className="gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500"
                    >
                      <Share className="w-4 h-4" />
                      Share
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </AnimatedCard>
  )
}
