import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share, Plus, Award, Users } from "lucide-react"

export function ExampleButtons() {
  return (
    <div className="space-y-4 p-4">
      {/* Basic buttons with different variants */}
      <div className="space-x-2">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      {/* Different sizes */}
      <div className="space-x-2 flex items-center">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Recovery-themed buttons */}
      <div className="space-x-2">
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <Users className="w-4 h-4 mr-2" />
          Join Meeting
        </Button>

        <Button
          variant="outline"
          className="border-green-500 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 bg-transparent"
        >
          <Award className="w-4 h-4 mr-2" />
          Share Milestone
        </Button>

        <Button
          variant="ghost"
          className="text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Gratitude
        </Button>
      </div>

      {/* Post interaction buttons */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Heart className="w-5 h-5" />
          Like
        </Button>
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <MessageCircle className="w-5 h-5" />
          Comment
        </Button>
        <Button
          variant="ghost"
          className="flex-1 gap-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Share className="w-5 h-5" />
          Share
        </Button>
      </div>

      {/* Disabled state */}
      <Button disabled>Disabled Button</Button>

      {/* With loading state */}
      <Button disabled>
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    </div>
  )
}
