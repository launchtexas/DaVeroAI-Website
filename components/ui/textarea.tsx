import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field field-sizing-content min-h-36 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
