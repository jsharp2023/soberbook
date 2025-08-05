"use client"

import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, FlatList } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

export function MeetingFinder() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const meetings = [
    {
      id: "1",
      name: "Morning Serenity AA",
      type: "AA",
      time: "7:00 AM",
      location: "Community Center",
      isVirtual: false,
      attendees: 12,
    },
    {
      id: "2",
      name: "NA Step Study",
      type: "NA",
      time: "12:00 PM",
      location: "Virtual Meeting",
      isVirtual: true,
      attendees: 8,
    },
    {
      id: "3",
      name: "Al-Anon Family Group",
      type: "Al-Anon",
      time: "6:30 PM",
      location: "St. Mary's Church",
      isVirtual: false,
      attendees: 15,
    },
  ]

  const renderMeeting = ({ item }: { item: any }) => (
    <View style={styles.meetingCard}>
      <View style={styles.meetingHeader}>
        <Text style={styles.meetingName}>{item.name}</Text>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.meetingDetails}>
        <View style={styles.meetingInfo}>
          <Icon name="access-time" size={16} color={styles.infoIcon.color} />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
        <View style={styles.meetingInfo}>
          <Icon name={item.isVirtual ? "videocam" : "location-on"} size={16} color={styles.infoIcon.color} />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.meetingInfo}>
          <Icon name="group" size={16} color={styles.infoIcon.color} />
          <Text style={styles.infoText}>{item.attendees} attending</Text>
        </View>
      </View>

      <View style={styles.meetingTags}>
        <View style={[styles.typeTag, { backgroundColor: getTypeColor(item.type) }]}>
          <Text style={styles.typeTagText}>{item.type}</Text>
        </View>
        {item.isVirtual && (
          <View style={styles.virtualTag}>
            <Icon name="videocam" size={12} color="#FFFFFF" />
            <Text style={styles.virtualTagText}>Virtual</Text>
          </View>
        )}
      </View>
    </View>
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "AA":
        return "#3B82F6"
      case "NA":
        return "#10B981"
      case "Al-Anon":
        return "#8B5CF6"
      default:
        return "#6B7280"
    }
  }

  const styles = createStyles(isDark)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Meetings</Text>
      <FlatList
        data={meetings}
        renderItem={renderMeeting}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.findMoreButton}>
        <Text style={styles.findMoreButtonText}>Find More Meetings</Text>
      </TouchableOpacity>
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
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 16,
    },
    meetingCard: {
      backgroundColor: isDark ? "#374151" : "#F9FAFB",
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    meetingHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    meetingName: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#FFFFFF" : "#111827",
      flex: 1,
    },
    joinButton: {
      backgroundColor: "#3B82F6",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    joinButtonText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
    meetingDetails: {
      marginBottom: 8,
    },
    meetingInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    infoIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginRight: 8,
    },
    infoText: {
      fontSize: 14,
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    meetingTags: {
      flexDirection: "row",
      alignItems: "center",
    },
    typeTag: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginRight: 8,
    },
    typeTagText: {
      color: "#FFFFFF",
      fontSize: 10,
      fontWeight: "600",
    },
    virtualTag: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#6B7280",
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    virtualTagText: {
      color: "#FFFFFF",
      fontSize: 10,
      marginLeft: 2,
    },
    findMoreButton: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#3B82F6",
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 8,
    },
    findMoreButtonText: {
      color: "#3B82F6",
      fontSize: 14,
      fontWeight: "600",
    },
  })
