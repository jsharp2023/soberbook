"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Modal,
  Image,
  Alert,
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"

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
}

interface ProfileEditorProps {
  isOpen: boolean
  onClose: () => void
  initialProfile?: Partial<UserProfile>
  onProfileUpdate?: (updatedProfile: UserProfile) => void
}

export function ProfileEditor({ isOpen, onClose, initialProfile, onProfileUpdate }: ProfileEditorProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [profile, setProfile] = useState<UserProfile>({
    id: "user_1",
    firstName: "John",
    lastName: "Doe",
    displayName: "John D.",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    avatar: "https://via.placeholder.com/120",
    coverPhoto: "https://via.placeholder.com/400x200",
    bio: "One day at a time. Grateful for my recovery journey and the amazing community that supports me.",
    location: "San Francisco, CA",
    sobrietyDate: "2023-01-15",
    currentStep: 4,
    sponsor: "Lisa T.",
    homeGroup: "Morning Serenity AA",
    programs: ["AA", "NA"],
    interests: ["Meditation", "Hiking", "Reading", "Cooking", "Volunteering"],
    ...initialProfile,
  })

  const [activeTab, setActiveTab] = useState("basic")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const currentUser = await AsyncStorage.getItem("user")
      const userData = currentUser ? JSON.parse(currentUser) : {}

      const updatedUser = {
        ...userData,
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

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser))

      if (onProfileUpdate) {
        onProfileUpdate(profile)
      }

      Alert.alert("Success", "Your profile has been updated successfully!")
      onClose()
    } catch (error) {
      Alert.alert("Error", "Failed to save profile changes")
    } finally {
      setIsSaving(false)
      setIsEditing(false)
    }
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: "person" },
    { id: "recovery", label: "Recovery", icon: "emoji-events" },
    { id: "privacy", label: "Privacy", icon: "security" },
  ]

  const styles = createStyles(isDark)

  return (
    <Modal visible={isOpen} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={styles.headerIcon.color} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          {isEditing && (
            <TouchableOpacity onPress={handleSave} disabled={isSaving}>
              <Text style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}>
                {isSaving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon} size={20} color={activeTab === tab.id ? "#3B82F6" : styles.tabIcon.color} />
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.content}>
          {activeTab === "basic" && (
            <View style={styles.tabContent}>
              {/* Cover Photo */}
              <View style={styles.coverContainer}>
                <Image source={{ uri: profile.coverPhoto }} style={styles.coverPhoto} />
                <TouchableOpacity style={styles.changeCoverButton}>
                  <Icon name="camera-alt" size={16} color="#FFFFFF" />
                  <Text style={styles.changeCoverText}>Change Cover</Text>
                </TouchableOpacity>
              </View>

              {/* Avatar */}
              <View style={styles.avatarContainer}>
                <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                <TouchableOpacity style={styles.changeAvatarButton}>
                  <Icon name="camera-alt" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                <View style={styles.inputRow}>
                  <View style={styles.inputHalf}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      value={profile.firstName}
                      onChangeText={(text) => {
                        setProfile((prev) => ({ ...prev, firstName: text }))
                        setIsEditing(true)
                      }}
                      placeholderTextColor={styles.placeholder.color}
                    />
                  </View>
                  <View style={styles.inputHalf}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      value={profile.lastName}
                      onChangeText={(text) => {
                        setProfile((prev) => ({ ...prev, lastName: text }))
                        setIsEditing(true)
                      }}
                      placeholderTextColor={styles.placeholder.color}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Display Name</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.displayName}
                    onChangeText={(text) => {
                      setProfile((prev) => ({ ...prev, displayName: text }))
                      setIsEditing(true)
                    }}
                    placeholder="How you want to appear to others"
                    placeholderTextColor={styles.placeholder.color}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={profile.bio}
                    onChangeText={(text) => {
                      setProfile((prev) => ({ ...prev, bio: text }))
                      setIsEditing(true)
                    }}
                    placeholder="Tell others about your recovery journey..."
                    placeholderTextColor={styles.placeholder.color}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.email}
                    onChangeText={(text) => {
                      setProfile((prev) => ({ ...prev, email: text }))
                      setIsEditing(true)
                    }}
                    keyboardType="email-address"
                    placeholderTextColor={styles.placeholder.color}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Location</Text>
                  <TextInput
                    style={styles.input}
                    value={profile.location}
                    onChangeText={(text) => {
                      setProfile((prev) => ({ ...prev, location: text }))
                      setIsEditing(true)
                    }}
                    placeholder="City, State"
                    placeholderTextColor={styles.placeholder.color}
                  />
                </View>
              </View>
            </View>
          )}

          {activeTab === "recovery" && (
            <View style={styles.tabContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Sobriety Date</Text>
                <TextInput
                  style={styles.input}
                  value={profile.sobrietyDate}
                  onChangeText={(text) => {
                    setProfile((prev) => ({ ...prev, sobrietyDate: text }))
                    setIsEditing(true)
                  }}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={styles.placeholder.color}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Step</Text>
                <TextInput
                  style={styles.input}
                  value={profile.currentStep.toString()}
                  onChangeText={(text) => {
                    setProfile((prev) => ({ ...prev, currentStep: Number.parseInt(text) || 1 }))
                    setIsEditing(true)
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={styles.placeholder.color}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Sponsor</Text>
                <TextInput
                  style={styles.input}
                  value={profile.sponsor}
                  onChangeText={(text) => {
                    setProfile((prev) => ({ ...prev, sponsor: text }))
                    setIsEditing(true)
                  }}
                  placeholder="Your sponsor's name"
                  placeholderTextColor={styles.placeholder.color}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Home Group</Text>
                <TextInput
                  style={styles.input}
                  value={profile.homeGroup}
                  onChangeText={(text) => {
                    setProfile((prev) => ({ ...prev, homeGroup: text }))
                    setIsEditing(true)
                  }}
                  placeholder="Your regular meeting group"
                  placeholderTextColor={styles.placeholder.color}
                />
              </View>
            </View>
          )}

          {activeTab === "privacy" && (
            <View style={styles.tabContent}>
              <Text style={styles.sectionTitle}>Privacy Settings</Text>
              <Text style={styles.sectionDescription}>
                Control who can see your profile information and recovery progress.
              </Text>

              <View style={styles.privacyOption}>
                <Text style={styles.privacyLabel}>Profile Visibility</Text>
                <Text style={styles.privacyValue}>Friends Only</Text>
              </View>

              <View style={styles.privacyOption}>
                <Text style={styles.privacyLabel}>Show Sobriety Date</Text>
                <Text style={styles.privacyValue}>Yes</Text>
              </View>

              <View style={styles.privacyOption}>
                <Text style={styles.privacyLabel}>Show Recovery Progress</Text>
                <Text style={styles.privacyValue}>Yes</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111827" : "#FFFFFF",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#E5E7EB",
    },
    headerIcon: {
      color: isDark ? "#FFFFFF" : "#111827",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
    },
    saveButton: {
      color: "#3B82F6",
      fontSize: 16,
      fontWeight: "600",
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    tabContainer: {
      flexDirection: "row",
      backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
    },
    tab: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#3B82F6",
    },
    tabIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginRight: 4,
    },
    tabText: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    activeTabText: {
      color: "#3B82F6",
      fontWeight: "600",
    },
    content: {
      flex: 1,
    },
    tabContent: {
      padding: 16,
    },
    coverContainer: {
      position: "relative",
      height: 150,
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 60,
    },
    coverPhoto: {
      width: "100%",
      height: "100%",
    },
    changeCoverButton: {
      position: "absolute",
      bottom: 8,
      right: 8,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    changeCoverText: {
      color: "#FFFFFF",
      fontSize: 12,
      marginLeft: 4,
    },
    avatarContainer: {
      position: "absolute",
      top: 110,
      left: 16,
      zIndex: 1,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: isDark ? "#111827" : "#FFFFFF",
    },
    changeAvatarButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: "#3B82F6",
      borderRadius: 12,
      padding: 4,
    },
    formContainer: {
      marginTop: 20,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    inputHalf: {
      width: "48%",
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 4,
    },
    input: {
      backgroundColor: isDark ? "#374151" : "#F9FAFB",
      borderWidth: 1,
      borderColor: isDark ? "#4B5563" : "#E5E7EB",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
    },
    textArea: {
      height: 80,
      textAlignVertical: "top",
    },
    placeholder: {
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginBottom: 20,
    },
    privacyOption: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#E5E7EB",
    },
    privacyLabel: {
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
    },
    privacyValue: {
      fontSize: 14,
      color: "#3B82F6",
      fontWeight: "500",
    },
  })
