"use client";
import {
  HTMLMotionProps,
  motion,
  MotionProps,
  Variant,
  Variants,
} from "motion/react";
import { cn } from "@/app/lib/util";
import { ButtonVariants } from "@/app/types/component";

const buttonStyles = {
  primary: " shadow-[inset_2px_3px_6px_rgba(255,255,255,0.5)] ",
  secondary:
    "bg-linear-0 from-neutral-950 to-neutral-800   shadow-[inset_0px_2px_1px_rgba(255,255,255,0.1)]",
};

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariants;
}
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariants;
// }

const primaryVariant: Variants = {
  still: {
    backgroundImage:
      "linear-gradient(oklch(62.7% 0.194 149.214),oklch(39.3% 0.095 152.535))",
    backgroundSize: "30px 150%",
  },
  hovered: {
    backgroundImage:
      "linear-gradient(oklch(62.7% 0.194 149.214), oklch(39.3% 0.095 152.535))",
    backgroundSize: "30px 100%",
  },
};
const secondaryVariant: Variants = {
  still: {
    backgroundImage:
      "linear-gradient(var(--color-neutral-800), var(--color-neutral-950))",
    backgroundSize: "30px 100%",
  },
  hovered: {
    backgroundImage:
      "linear-gradient(var(--color-neutral-800),var(--color-neutral-950))",
    backgroundSize: "30px 200%",
  },
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      initial="still"
      whileHover={"hovered"}
      variants={variant === "primary" ? primaryVariant : secondaryVariant}
      transition={{
        duration: 0.2,
      }}
      {...rest}
      className={cn(
        "px-4 py-2 cursor-pointer rounded-md",
        buttonStyles[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}
