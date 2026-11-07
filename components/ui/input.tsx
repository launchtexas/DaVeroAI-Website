import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "field min-w-0 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Input }
