"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
  Alert,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface LoginScreenProps {
  onLogin: (user: any) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: formData.name || "John Doe",
        email: formData.email,
        avatar: "https://via.placeholder.com/100",
        sobrietyDays: isSignUp ? 1 : 127,
        displayName: formData.name || "John D.",
        profile: {
          firstName: formData.name?.split(" ")[0] || "John",
          lastName: formData.name?.split(" ")[1] || "Doe",
          sobrietyDate: new Date().toISOString().split("T")[0],
          currentStep: 1,
          bio: "One day at a time. Grateful for my recovery journey.",
          location: "San Francisco, CA",
          sponsor: "Lisa T.",
          homeGroup: "Morning Serenity AA",
          programs: ["AA"],
          interests: ["Meditation", "Hiking", "Reading"],
          coverPhoto: "https://via.placeholder.com/400x200",
        },
      }

      onLogin(user)
      setLoading(false)
    }, 1500)
  }

  const styles = createStyles(isDark)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.logo} />
        <Text style={styles.title}>Welcome to SoberBook</Text>
        <Text style={styles.subtitle}>
          {isSignUp ? "Create your recovery community account" : "Sign in to your recovery community"}
        </Text>
      </View>

      <View style={styles.form}>
        {isSignUp && (
          <View style={styles.inputContainer}>
            <Icon name="person" size={20} color={styles.inputIcon.color} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={styles.placeholder.color}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Icon name="email" size={20} color={styles.inputIcon.color} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={styles.placeholder.color}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color={styles.inputIcon.color} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            placeholderTextColor={styles.placeholder.color}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Icon name={showPassword ? "visibility-off" : "visibility"} size={20} color={styles.inputIcon.color} />
          </TouchableOpacity>
        </View>

        {isSignUp && (
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={styles.inputIcon.color} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={styles.placeholder.color}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry={!showPassword}
            />
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? (isSignUp ? "Creating Account..." : "Signing In...") : isSignUp ? "Create Account" : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.switchButton} onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchButtonText}>
            {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>
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
      flexGrow: 1,
      justifyContent: "center",
      padding: 20,
    },
    header: {
      alignItems: "center",
      marginBottom: 40,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: isDark ? "#FFFFFF" : "#111827",
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? "#9CA3AF" : "#6B7280",
      textAlign: "center",
    },
    form: {
      width: "100%",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#374151" : "#FFFFFF",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: isDark ? "#4B5563" : "#E5E7EB",
    },
    inputIcon: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: isDark ? "#FFFFFF" : "#111827",
    },
    placeholder: {
      color: isDark ? "#9CA3AF" : "#6B7280",
    },
    eyeIcon: {
      padding: 4,
    },
    submitButton: {
      backgroundColor: "#3B82F6",
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 8,
    },
    submitButtonDisabled: {
      opacity: 0.6,
    },
    submitButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
    switchButton: {
      alignItems: "center",
      marginTop: 20,
    },
    switchButtonText: {
      color: "#3B82F6",
      fontSize: 14,
    },
  })
