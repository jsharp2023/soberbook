"use client"
import  {LoginForm}  from "@/components/auth/login-form"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (user: any) => {
    // Store user data (in real app, this would be handled by auth context/state management)
    localStorage.setItem("user", JSON.stringify(user))

    // Redirect to home page
    router.push("/")
  }

  return <LoginForm onLogin={handleLogin} />
}
