import * as React from "react"
import { clsx } from "clsx"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
          {
            "bg-blue-600 text-white border-transparent": variant === "default",
            "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200": variant === "secondary",
            "bg-red-500 text-white border-transparent": variant === "destructive",
            "border border-gray-300 text-gray-700": variant === "outline",
          },
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"
