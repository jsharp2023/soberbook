"use client"

import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"

interface CreatePostProps {
  onPost: (content: string, type?: string) => void
}

export function CreatePost({ onPost }: CreatePostProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [content, setContent] = useState("")
  const [postType, setPostType] = useState("reflection")
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

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

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content, postType)
      setContent("")
      setIsExpanded(false)
    }
  }

  const displayName = currentUser?.displayName || currentUser?.name || "Anonymous"
  const userAvatar = currentUser?.avatar || currentUser?.profile?.avatar || "https://via.placeholder.com/40"

  const calculateSobrietyDays = () => {
    if (currentUser?.profile?.sobrietyDate) {
      const sobrietyDate = new Date(currentUser.profile.sobrietyDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return currentUser?.sobrietyDays || 1
  }

  const styles = createStyles(isDark)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userStats}>
            {calculateSobrietyDays()} days • Step {currentUser?.profile?.currentStep || 1}
          </Text>
        </View>
      </View>

      <TextInput
        style={[styles.input, isExpanded && styles.inputExpanded]}
        placeholder={`What's on your mind, ${displayName.split(" ")[0]}? Share your recovery journey...`}
        placeholderTextColor={styles.placeholder.color}
        value={content}
        onChangeText={setContent}
        onFocus={() => setIsExpanded(true)}
        multiline
        numberOfLines={isExpanded ? 4 : 2}
      />

      {isExpanded && (
        <View style={styles.actions}>
          <View style={styles.postTypeContainer}>
            <TouchableOpacity
              style={[styles.postTypeButton, postType === "reflection" && styles.postTypeButtonActive]}
              onPress={() => setPostType("reflection")}
            >
              <Icon name="chat-bubble" size={16} color="#3B82F6" />
              <Text style={styles.postTypeText}>Reflection</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.postTypeButton, postType === "milestone" && styles.postTypeButtonActive]}
              onPress={() => setPostType("milestone")}
            >
              <Icon name="emoji-events" size={16} color="#10B981" />
              <Text style={styles.postTypeText}>Milestone</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.postTypeButton, postType === "support" && styles.postTypeButtonActive]}
              onPress={() => setPostType("support")}
            >
              <Icon name="favorite" size={16} color="#EF4444" />
              <Text style={styles.postTypeText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.postTypeButton, postType === "celebration" && styles.postTypeButtonActive]}
              onPress={() => setPostType("celebration")}
            >
              <Icon name="celebration" size={16} color="#F59E0B" />
              <Text style={styles.postTypeText}>Celebrate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setContent("")
                setIsExpanded(false)
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, !content.trim() && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!content.trim()}
            >
              <Text style={styles.submitButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    userName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FFFFFF" : "#111827",
    },
    userStats: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    input: {
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
      backgroundColor: isDark ? "#374151" : "#F3F4F6",
      borderRadius: 8,
      padding: 12,
      minHeight: 40,
      textAlignVertical: "top",
    },
    inputExpanded: {
      minHeight: 80,
    },
    placeholder: {
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    actions: {
      marginTop: 12,
    },
    postTypeContainer: {
      flexDirection: "row",
      marginBottom: 12,
      flexWrap: "wrap",
    },
    postTypeButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
      backgroundColor: isDark ? "#374151" : "#F3F4F6",
    },
    postTypeButtonActive: {
      backgroundColor: isDark ? "#1E40AF" : "#DBEAFE",
    },
    postTypeText: {
      fontSize: 12,
      color: isDark ? "#FFFFFF" : "#111827",
      marginLeft: 4,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    cancelButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginRight: 8,
    },
    cancelButtonText: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      fontSize: 14,
    },
    submitButton: {
      backgroundColor: "#3B82F6",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "600",
    },
  })

