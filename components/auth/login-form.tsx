"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LoginFormProps {
  onLogin: (user: any) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<string | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Simulate successful sign up
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        avatar: "/placeholder.svg?height=32&width=32",
        soberDays: 1,
      }

      toast({
        title: "Welcome to SoberBook!",
        description: "Your account has been created successfully",
      })

      onLogin(newUser)
    } else {
      // Simulate successful sign in
      const user = {
        id: 1,
        name: formData.name || "John Doe",
        email: formData.email,
        avatar: "/placeholder.svg?height=32&width=32",
        soberDays: 127,
      }

      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully",
      })

      onLogin(user)
    }

    setLoading(false)
  }

  const handleOAuthLogin = async (provider: string) => {
    setOauthLoading(provider)

    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const user = {
      id: Date.now(),
      name: `User from ${provider}`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: "/placeholder.svg?height=32&width=32",
      soberDays: 89,
      provider,
    }

    toast({
      title: `Welcome via ${provider}!`,
      description: "You have been signed in successfully",
    })

    onLogin(user)
    setOauthLoading(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <img src="/sober-bok-logo.webp" alt="Sober Bok Logo" className="w-16 h-16 object-contain" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to SoberBook
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                {isSignUp ? "Create your recovery community account" : "Sign in to your recovery community"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                onClick={() => handleOAuthLogin("Google")}
                disabled={oauthLoading !== null}
              >
                {oauthLoading === "Google" ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-12 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                onClick={() => handleOAuthLogin("Facebook")}
                disabled={oauthLoading !== null}
              >
                {oauthLoading === "Facebook" ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
                Continue with Facebook
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                  onClick={() => handleOAuthLogin("Apple")}
                  disabled={oauthLoading !== null}
                >
                  {oauthLoading === "Apple" ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.56.37 4.703.644 3.967 1.007c-.74.364-1.379.85-2.009 1.48C1.329 3.117.843 3.756.48 4.496.116 5.231-.158 6.089-.32 7.318-.484 8.553-.528 8.924-.528 12.545s.044 3.992.207 5.227c.163 1.229.437 2.087.8 2.822.364.74.85 1.379 1.48 2.009.63.63 1.269 1.116 2.009 1.48.735.364 1.593.637 2.822.8 1.235.164 3.606.208 5.227.208s3.992-.044 5.227-.207c1.229-.163 2.087-.437 2.822-.8.74-.365 1.379-.85 2.009-1.48.63-.63 1.116-1.269 1.48-2.009.364-.735.637-1.593.8-2.822.164-1.235.208-3.606.208-5.227s-.044-3.992-.207-5.227c-.163-1.229-.437-2.087-.8-2.822-.365-.74-.85-1.379-1.48-2.009C20.883 1.329 20.244.843 19.504.48 18.769.116 17.911-.158 16.682-.32 15.447-.484 15.076-.528 12.017-.528zm0 2.166c3.549 0 3.97.044 5.37.207 1.296.059 2 .274 2.469.456.62.241 1.063.529 1.527.993.464.464.752.907.993 1.527.182.469.397 1.173.456 2.469.163 1.4.207 1.821.207 5.37s-.044 3.97-.207 5.37c-.059 1.296-.274 2-.456 2.469-.241.62-.529 1.063-.993 1.527-.464.464-.907.752-1.527.993-.469.182-1.173.397-2.469.456-1.4.163-1.821.207-5.37.207s-3.97-.044-5.37-.207c-1.296-.059-2-.274-2.469-.456-.62-.241-1.063-.529-1.527-.993-.464-.464-.752-.907-.993-1.527-.182-.469-.397-1.173-.456-2.469-.163-1.4-.207-1.821-.207-5.37s.044-3.97.207-5.37c.059-1.296.274-2 .456-2.469.241-.62.529-1.063.993-1.527.464-.464.907-.752 1.527-.993.469-.182 1.173-.397 2.469-.456 1.4-.163 1.821-.207 5.37-.207z" />
                    </svg>
                  )}
                  Apple
                </Button>

                <Button
                  variant="outline"
                  className="h-12 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
                  onClick={() => handleOAuthLogin("GitHub")}
                  disabled={oauthLoading !== null}
                >
                  {oauthLoading === "GitHub" ? (
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  GitHub
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white dark:bg-gray-800 px-3 text-sm text-gray-500 dark:text-gray-400">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 h-12 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    required
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {isSignUp && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isSignUp ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : (
                  <>{isSignUp ? "Create Account" : "Sign In"}</>
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </button>

              {!isSignUp && (
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      toast({
                        title: "Password Reset",
                        description: "Password reset link sent to your email",
                      })
                    }
                    className="text-gray-500 dark:text-gray-400 hover:underline text-sm"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </div>

            {isSignUp && (
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                By creating an account, you agree to our{" "}
                <button className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</button> and{" "}
                <button className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button>
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
