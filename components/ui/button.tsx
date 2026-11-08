import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Variants follow docs/design.md §6 (primary / secondary).
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-[15px] font-semibold whitespace-nowrap transition-[color,background-color,border-color,transform] duration-150 ease-out select-none disabled:cursor-not-allowed disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press disabled:hover:bg-accent",
        secondary:
          "border-line-strong bg-transparent text-fg hover:border-fg active:bg-surface",
        ghost: "border-transparent text-fg hover:bg-surface",
      },
      size: {
        default: "min-h-11 px-5 py-3",
        icon: "size-11",
        "icon-sm": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
