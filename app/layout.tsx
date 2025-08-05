// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {ThemeProvider} from "@/components/theme-provider"
import {LoginForm} from "@/components/auth/login-form"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoberBook - Social Network for Sober Living",
  description: "Connect with others on their sobriety journey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


