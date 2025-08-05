import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecoveryResources } from "@/components/recovery-resources"

const recoveryConnections = [
  {
    name: "Lisa T. (Sponsor)",
    avatar: "/placeholder.svg?height=40&width=40",
    sobrietyTime: "5 years sober",
    program: "AA",
  },
  {
    name: "David W.",
    avatar: "/placeholder.svg?height=40&width=40",
    sobrietyTime: "2 years clean",
    program: "NA",
  },
  {
    name: "Maria G.",
    avatar: "/placeholder.svg?height=40&width=40",
    sobrietyTime: "3 years in Al-Anon",
    program: "Al-Anon",
  },
]

const onlineFriends = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Mike Chen",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Alex Kim",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* Friend Suggestions */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Recovery Connections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recoveryConnections.map((connection) => (
            <div key={connection.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{connection.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {connection.sobrietyTime} • {connection.program}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 bg-transparent"
              >
                Connect
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Online Friends */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-gray-100">
            Contacts
            <Badge
              variant="secondary"
              className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {onlineFriends.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {onlineFriends.map((friend) => (
            <div
              key={friend.name}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{friend.name}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sponsored */}
      <RecoveryResources />
    </div>
  )
}
