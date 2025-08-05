"use client"

import { useState, useEffect } from "react"
import { CreatePost } from "@/components/create-post"
import { Post } from "@/components/post"
import { motion } from "framer-motion"

interface PostData {
  id: string
  author: {
    name: string
    avatar: string
    sobrietyDays: number
    currentStep: number
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  type?: "milestone" | "reflection" | "support" | "celebration"
  tags?: string[]
}

export function NewsFeed() {
  const [posts, setPosts] = useState<PostData[]>([
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        sobrietyDays: 245,
        currentStep: 4,
      },
      content:
        "Just completed Step 4 today! It was challenging but so worth it. Grateful for my sponsor's guidance through this process. One day at a time! 🙏 #recovery #step4 #grateful",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      type: "milestone",
      tags: ["recovery", "step4", "grateful"],
    },
    {
      id: "2",
      author: {
        name: "Mike Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        sobrietyDays: 89,
        currentStep: 2,
      },
      content:
        "Attended my first AA meeting in a new city today. The fellowship is truly universal. Met some amazing people who welcomed me with open arms. Recovery is beautiful! ❤️",
      timestamp: "4 hours ago",
      likes: 31,
      comments: 12,
      shares: 5,
      isLiked: true,
      type: "reflection",
      tags: ["AA", "fellowship", "recovery"],
    },
    {
      id: "3",
      author: {
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        sobrietyDays: 156,
        currentStep: 3,
      },
      content:
        "Struggling with some difficult emotions today. Reminded myself that feelings aren't facts and this too shall pass. Reaching out to my support network. 💪 #onedayatatime",
      timestamp: "6 hours ago",
      likes: 18,
      comments: 15,
      shares: 2,
      isLiked: false,
      type: "support",
      tags: ["onedayatatime", "support", "emotions"],
    },
    {
      id: "4",
      author: {
        name: "Alex Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        sobrietyDays: 312,
        currentStep: 8,
      },
      content:
        "Celebrating 10 months sober today! 🎉 This journey has taught me so much about myself and what I'm capable of. Thank you to everyone in this community for your support!",
      timestamp: "8 hours ago",
      likes: 67,
      comments: 23,
      shares: 12,
      isLiked: true,
      type: "celebration",
      tags: ["milestone", "10months", "celebration"],
    },
    {
      id: "5",
      author: {
        name: "Lisa Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        sobrietyDays: 78,
        currentStep: 2,
      },
      content:
        "Morning meditation was exactly what I needed today. Starting the day with gratitude and intention. What are you grateful for today? 🧘‍♀️ #meditation #gratitude #recovery",
      timestamp: "10 hours ago",
      likes: 29,
      comments: 18,
      shares: 7,
      isLiked: false,
      type: "reflection",
      tags: ["meditation", "gratitude", "recovery"],
    },
  ])

  const [currentUser, setCurrentUser] = useState<any>(null)

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

      // Update posts that belong to the current user
      if (event.detail?.user) {
        const updatedUser = event.detail.user
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.author.name === currentUser?.name || post.author.name === currentUser?.displayName) {
              return {
                ...post,
                author: {
                  ...post.author,
                  name: updatedUser.displayName || updatedUser.name,
                  avatar: updatedUser.avatar || post.author.avatar,
                  sobrietyDays: updatedUser.profile?.sobrietyDate
                    ? Math.ceil(
                        (new Date().getTime() - new Date(updatedUser.profile.sobrietyDate).getTime()) /
                          (1000 * 60 * 60 * 24),
                      )
                    : post.author.sobrietyDays,
                  currentStep: updatedUser.profile?.currentStep || post.author.currentStep,
                },
              }
            }
            return post
          }),
        )
      }
    }

    window.addEventListener("profileUpdated", handleProfileUpdate)

    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate)
    }
  }, [currentUser?.name, currentUser?.displayName])

  const handleNewPost = (content: string, type?: string) => {
    if (!currentUser) return

    const calculateSobrietyDays = () => {
      if (currentUser.profile?.sobrietyDate) {
        const sobrietyDate = new Date(currentUser.profile.sobrietyDate)
        const today = new Date()
        const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      }
      return currentUser.sobrietyDays || 1
    }

    const newPost: PostData = {
      id: Date.now().toString(),
      author: {
        name: currentUser.displayName || currentUser.name || "Anonymous",
        avatar: currentUser.avatar || currentUser.profile?.avatar || "/placeholder.svg?height=40&width=40",
        sobrietyDays: calculateSobrietyDays(),
        currentStep: currentUser.profile?.currentStep || currentUser.currentStep || 1,
      },
      content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      type: (type as "milestone" | "reflection" | "support" | "celebration") || "reflection",
      tags: [],
    }

    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post,
      ),
    )
  }

  const handleShare = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              shares: post.shares + 1,
            }
          : post,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <CreatePost onPost={handleNewPost} />

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Post
              post={{
                id: Number.parseInt(post.id),
                user: {
                  name: post.author.name,
                  avatar: post.author.avatar,
                  verified: false,
                  sobrietyBadge: `${post.author.sobrietyDays} days`,
                },
                content: post.content,
                timestamp: post.timestamp,
                likes: post.likes || 0,
                comments: post.comments || 0,
                shares: post.shares || 0,
              }}
              onPostUpdate={(postId, content) => {
                setPosts((prevPosts) => prevPosts.map((p) => (p.id === postId.toString() ? { ...p, content } : p)))
              }}
              currentUserId={currentUser?.displayName || currentUser?.name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
