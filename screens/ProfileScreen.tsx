"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme, Image } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"

import { ProfileEditor } from "../components/ProfileEditor"

export default function ProfileScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [showEditor, setShowEditor] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      if (userData) {
        setUserProfile(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }

  const handleProfileUpdate = async (updatedProfile: any) => {
    await loadUserProfile()
  }

  const calculateSobrietyDays = () => {
    if (userProfile?.profile?.sobrietyDate) {
      const sobrietyDate = new Date(userProfile.profile.sobrietyDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return userProfile?.sobrietyDays || 1
  }

  const styles = createStyles(isDark)

  if (!userProfile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Cover Photo */}
      <View style={styles.coverContainer}>
        <Image
          source={{
            uri: userProfile.profile?.coverPhoto || "https://via.placeholder.com/400x200",
          }}
          style={styles.coverPhoto}
        />
        <TouchableOpacity style={styles.editButton} onPress={() => setShowEditor(true)}>
          <Icon name="edit" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: userProfile.avatar || userProfile.profile?.avatar || "https://via.placeholder.com/100",
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.displayName}>{userProfile.displayName || userProfile.name || "Anonymous"}</Text>

        <Text style={styles.bio}>
          {userProfile.profile?.bio || "One day at a time. Grateful for my recovery journey."}
        </Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{calculateSobrietyDays()}</Text>
            <Text style={styles.statLabel}>Days Sober</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.profile?.currentStep || userProfile.currentStep || 1}</Text>
            <Text style={styles.statLabel}>Current Step</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Meetings</Text>
          </View>
        </View>

        {/* Recovery Info */}
        <View style={styles.recoveryInfo}>
          <View style={styles.infoItem}>
            <Icon name="person" size={20} color={styles.infoIcon.color} />
            <Text style={styles.infoText}>Sponsor: {userProfile.profile?.sponsor || "Not assigned"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="group" size={20} color={styles.infoIcon.color} />
            <Text style={styles.infoText}>Home Group: {userProfile.profile?.homeGroup || "Not assigned"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="location-on" size={20} color={styles.infoIcon.color} />
            <Text style={styles.infoText}>{userProfile.profile?.location || "Location not set"}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="email" size={20} color={styles.infoIcon.color} />
            <Text style={styles.infoText}>{userProfile.email || "Email not set"}</Text>
          </View>
        </View>

        {/* Programs */}
        {userProfile.profile?.programs && userProfile.profile.programs.length > 0 && (
          <View style={styles.programsContainer}>
            <Text style={styles.sectionTitle}>Programs</Text>
            <View style={styles.programsRow}>
              {userProfile.profile.programs.map((program: string, index: number) => (
                <View key={index} style={styles.programBadge}>
                  <Text style={styles.programBadgeText}>{program}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Interests */}
        {userProfile.profile?.interests && userProfile.profile.interests.length > 0 && (
          <View style={styles.interestsContainer}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interestsRow}>
              {userProfile.profile.interests.map((interest: string, index: number) => (
                <View key={index} style={styles.interestTag}>
                  <Text style={styles.interestTagText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <ProfileEditor
        isOpen={showEditor}
        onClose={() => setShowEditor(false)}
        initialProfile={userProfile?.profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </ScrollView>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111827" : "#F9FAFB",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#111827" : "#F9FAFB",
    },
    loadingText: {
      color: isDark ? "#FFFFFF" : "#111827",
      fontSize: 16,
    },
    coverContainer: {
      position: "relative",
      height: 200,
    },
    coverPhoto: {
      width: "100%",
      height: "100%",
    },
    editButton: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 20,
      padding: 8,
    },
    profileInfo: {
      padding: 20,
      alignItems: "center",
    },
    avatarContainer: {
      marginTop: -50,
      marginBottom: 16,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 4,
      borderColor: isDark ? "#111827" : "#FFFFFF",
    },
    displayName: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 8,
    },
    bio: {
      fontSize: 16,
      color: isDark ? "#9CA3AF" : "#6B7280",
      textAlign: "center",
      marginBottom: 24,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginBottom: 24,
    },
    statItem: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#3B82F6",
    },
    statLabel: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginTop: 4,
    },
    recoveryInfo: {
      width: "100%",
      marginBottom: 24,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#E5E7EB",
    },
    infoIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginRight: 12,
    },
    infoText: {
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 12,
    },
    programsContainer: {
      width: "100%",
      marginBottom: 24,
    },
    programsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    programBadge: {
      backgroundColor: "#3B82F6",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    programBadgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
    interestsContainer: {
      width: "100%",
    },
    interestsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    interestTag: {
      backgroundColor: isDark ? "#374151" : "#F3F4F6",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    interestTagText: {
      color: isDark ? "#FFFFFF" : "#111827",
      fontSize: 12,
    },
  })
