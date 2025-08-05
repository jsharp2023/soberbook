"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, StatusBar, useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"

import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import MessagesScreen from "./screens/MessagesScreen"
import { ParallaxBackground } from "./components/ParallaxBackground"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MainTabs() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Messages") {
            iconName = "message"
          } else if (route.name === "Profile") {
            iconName = "person"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
        tabBarStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
          borderTopColor: isDark ? "#374151" : "#E5E7EB",
        },
        headerStyle: {
          backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
        },
        headerTintColor: isDark ? "#FFFFFF" : "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error("Error saving user data:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? "#111827" : "#F9FAFB" }]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <ParallaxBackground />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.container}>
        <ParallaxBackground />
        {user ? (
          <MainTabs />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">{(props) => <LoginScreen {...props} onLogin={handleLogin} />}</Stack.Screen>
          </Stack.Navigator>
        )}
      </View>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
