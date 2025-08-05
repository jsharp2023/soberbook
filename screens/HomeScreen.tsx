"use client"

import { useState, useEffect } from "react"
import { View, ScrollView, StyleSheet, useColorScheme, RefreshControl } from "react-native"


import { CreatePost } from "../components/CreatePost"
import { P } from "../components/P"
import { RecoveryStats } from "../components/RecoveryStats"
import { MeetingFinder } from "../components/MeetingFinder"

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
}

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [posts, setPosts] = useState<PostData[]>([
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "https://via.placeholder.com/40",
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
    },
    {
      id: "2",
      author: {
        name: "Mike Chen",
        avatar: "https://via.placeholder.com/40",
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
    },
    {
      id: "3",
      author: {
        name: "Emma Rodriguez",
        avatar: "https://via.placeholder.com/40",
        sobrietyDays: 156,
        currentStep: 3,
      },
      content:
        "Celebrating 5 months sober today! The journey hasn't been easy, but every day I'm grateful for the support of this amazing community. Thank you all for being part of my recovery! 💪✨",
      timestamp: "6 hours ago",
      likes: 47,
      comments: 15,
      shares: 8,
      isLiked: false,
      type: "celebration",
    },
  ])

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadCurrentUser()
  }, [])

  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      if (userData) {
        setCurrentUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

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
        avatar: currentUser.avatar || "https://via.placeholder.com/40",
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
    }

    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadCurrentUser()
    // Simulate loading new posts
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  const styles = createStyles(isDark)

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <RecoveryStats />
      <MeetingFinder />
      <CreatePost onPost={handleNewPost} />

      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <Post
            key={post.id}
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
            currentUserId={currentUser?.displayName || currentUser?.name}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111827" : "#F9FAFB",
    },
    content: {
      padding: 16,
    },
    postsContainer: {
      marginTop: 16,
    },
  })
