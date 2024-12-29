import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        grouped: "border border-input shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2 [&_svg]:h-4 [&_svg]:w-4",
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-10 rounded-md px-8 [&_svg]:h-5 [&_svg]:w-5",
        icon: "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4",
        tiny: "h-[26px] px-2.5 py-1 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  groupPosition?: "left" | "middle" | "right" | "single"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, groupPosition, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          groupPosition === "left" && "rounded-r-none",
          groupPosition === "middle" && "rounded-none border-l-0",
          groupPosition === "right" && "rounded-l-none border-l-0",
          (groupPosition === "middle" || groupPosition === "right") && "ml-[-1px]"
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex",
      className
    )}
    {...props}
  />
))
ButtonGroup.displayName = "ButtonGroup"

export { Button, ButtonGroup, buttonVariants }

