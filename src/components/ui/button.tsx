import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
    variant?: "primary" | "secondary" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // Base styles are defined in globals.css/tailwind layer but we can enforce here too
        // variants mapped to css classes
        const variantClasses = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            outline: "border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-3",
            ghost: "text-white hover:text-brand-orange transition-colors"
        }

        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                    variantClasses[variant],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
