"use client"

import { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme, Image } from "react-native"

interface Contact {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  sobrietyBadge?: string
}

export default function MessagesScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah M. (Sponsor)",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "How are you feeling about tomorrow's meeting?",
      timestamp: "2m ago",
      unreadCount: 2,
      isOnline: true,
      sobrietyBadge: "5 years",
    },
    {
      id: "2",
      name: "Mike C.",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Thanks for sharing your experience today",
      timestamp: "15m ago",
      unreadCount: 0,
      isOnline: true,
      sobrietyBadge: "2 years",
    },
    {
      id: "3",
      name: "Emma R.",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "The meditation session was really helpful",
      timestamp: "1h ago",
      unreadCount: 1,
      isOnline: false,
      sobrietyBadge: "1 year",
    },
    {
      id: "4",
      name: "Recovery Group Chat",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "John: See everyone at tonight's meeting!",
      timestamp: "2h ago",
      unreadCount: 5,
      isOnline: false,
      sobrietyBadge: "Group",
    },
    {
      id: "5",
      name: "Lisa T.",
      avatar: "https://via.placeholder.com/50",
      lastMessage: "Congratulations on your 30 days! 🎉",
      timestamp: "1d ago",
      unreadCount: 0,
      isOnline: false,
      sobrietyBadge: "3 years",
    },
  ])

  const renderContact = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactHeader}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>

        {item.sobrietyBadge && <Text style={styles.sobrietyBadge}>{item.sobrietyBadge} sober</Text>}
      </View>
    </TouchableOpacity>
  )

  const styles = createStyles(isDark)

  return (
    <View style={styles.container}>
      <FlatList data={contacts} renderItem={renderContact} keyExtractor={(item) => item.id} style={styles.list} />
    </View>
  )
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111827" : "#FFFFFF",
    },
    list: {
      flex: 1,
    },
    contactItem: {
      flexDirection: "row",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#E5E7EB",
    },
    avatarContainer: {
      position: "relative",
      marginRight: 12,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    onlineIndicator: {
      position: "absolute",
      bottom: 2,
      right: 2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#10B981",
      borderWidth: 2,
      borderColor: isDark ? "#111827" : "#FFFFFF",
    },
    contactInfo: {
      flex: 1,
    },
    contactHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    contactName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FFFFFF" : "#111827",
    },
    timestamp: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    messageRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    lastMessage: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
      flex: 1,
      marginRight: 8,
    },
    unreadBadge: {
      backgroundColor: "#3B82F6",
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 6,
    },
    unreadCount: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
    sobrietyBadge: {
      fontSize: 12,
      color: "#10B981",
      fontWeight: "500",
    },
  })
