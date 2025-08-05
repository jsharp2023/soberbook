"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, Image } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface PostProps {
  post: {
    id: number
    user: {
      name: string
      avatar: string
      verified?: boolean
      sobrietyBadge?: string
    }
    content: string
    timestamp: string
    likes?: number
    comments?: number
    shares?: number
  }
  currentUserId?: string
}

export function Post({ post, currentUserId }: PostProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const styles = createStyles(isDark)

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{post.user.name}</Text>
            {post.user.verified && <Icon name="verified" size={16} color="#3B82F6" style={styles.verifiedIcon} />}
            {post.user.sobrietyBadge && (
              <View style={styles.sobrietyBadge}>
                <Text style={styles.sobrietyBadgeText}>{post.user.sobrietyBadge} sober</Text>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Icon name="more-horiz" size={20} color={styles.moreIcon.color} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={styles.content}>{post.content}</Text>

      {/* Post Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>{likeCount} likes</Text>
        <View style={styles.statsRight}>
          <Text style={styles.statsText}>{post.comments || 0} comments</Text>
          <Text style={styles.statsText}>{post.shares || 0} shares</Text>
        </View>
      </View>

      {/* Post Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Icon
            name={isLiked ? "favorite" : "favorite-border"}
            size={20}
            color={isLiked ? "#EF4444" : styles.actionIcon.color}
          />
          <Text style={[styles.actionText, isLiked && styles.actionTextLiked]}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chat-bubble-outline" size={20} color={styles.actionIcon.color} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share" size={20} color={styles.actionIcon.color} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
    },
    userNameRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    userName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FFFFFF" : "#111827",
    },
    verifiedIcon: {
      marginLeft: 4,
    },
    sobrietyBadge: {
      backgroundColor: "#10B981",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      marginLeft: 8,
    },
    sobrietyBadgeText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "500",
    },
    timestamp: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginTop: 2,
    },
    moreButton: {
      padding: 4,
    },
    moreIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    content: {
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
      lineHeight: 24,
      marginBottom: 12,
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#E5E7EB",
      marginBottom: 8,
    },
    statsText: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    statsRight: {
      flexDirection: "row",
      gap: 16,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    actionIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    actionText: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginLeft: 4,
    },
    actionTextLiked: {
      color: "#EF4444",
    },
  })
