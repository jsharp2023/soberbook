import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Phone, Globe, Users } from "lucide-react"

const resources = [
  {
    title: "Big Book Daily",
    description: "Daily readings from the AA Big Book",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    title: "Crisis Hotline",
    description: "24/7 support when you need it most",
    icon: Phone,
    color: "text-red-500",
  },
  {
    title: "Meeting Finder",
    description: "Find AA, NA, Al-Anon meetings near you",
    icon: Globe,
    color: "text-green-500",
  },
  {
    title: "Sponsor Connect",
    description: "Connect with available sponsors",
    icon: Users,
    color: "text-purple-500",
  },
]

export function RecoveryResources() {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Recovery Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
          >
            <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${resource.color}`}>
              <resource.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{resource.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">{resource.description}</p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Resources
        </Button>
      </CardContent>
    </Card>
  )
}
