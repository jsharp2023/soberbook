"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Icon from "react-native-vector-icons/MaterialIcons"

export function RecoveryStats() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

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

  const calculateSobrietyDays = () => {
    if (currentUser?.profile?.sobrietyDate) {
      const sobrietyDate = new Date(currentUser.profile.sobrietyDate)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - sobrietyDate.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return currentUser?.sobrietyDays || 1
  }

  const stats = [
    { icon: "emoji-events", label: "Days Sober", value: calculateSobrietyDays().toString(), color: "#10B981" },
    {
      icon: "trending-up",
      label: "Current Step",
      value: (currentUser?.profile?.currentStep || currentUser?.currentStep || 1).toString(),
      color: "#3B82F6",
    },
    { icon: "group", label: "Meetings", value: "47", color: "#8B5CF6" },
    { icon: "favorite", label: "Milestones", value: "3", color: "#EF4444" },
  ]

  const styles = createStyles(isDark)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Recovery Journey</Text>
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Icon name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
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
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 16,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    statCard: {
      width: "48%",
      alignItems: "center",
      padding: 12,
      backgroundColor: isDark ? "#374151" : "#F9FAFB",
      borderRadius: 8,
      marginBottom: 8,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginTop: 8,
    },
    statLabel: {
      fontSize: 12,
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginTop: 4,
      textAlign: "center",
    },
  })
