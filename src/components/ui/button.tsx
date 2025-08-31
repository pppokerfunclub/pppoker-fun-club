import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared";

const buttonVariants = cva(
  "cursor-pointer transition-all duration-300 inline-flex items-center justify-center text-base font-semibold gap-2.5 hover:scale-105 hover:shadow-lg active:scale-95 transform hover:brightness-110 hover:rotate-1",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-black hover:bg-primary/90 hover:shadow-primary/25 hover:shadow-xl hover:border-2 hover:border-primary/20",
        outline:
          "bg-transparent text-primary border border-primary hover:bg-primary hover:text-black hover:border-primary/80 hover:shadow-primary/20 hover:shadow-xl hover:scale-110",
      },
      size: {
        default: "h-13 px-5 rounded-xl w-auto",
        sm: "h-8 rounded-full px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
