import { cn } from "@/app/lib/util";
import { ButtonVariants } from "@/app/types/component";

const buttonStyles = {
  primary:
    "bg-linear-60 from-green-600 to-green-800 shadow-[inset_2px_3px_6px_rgba(255,255,255,0.5)] ",
  secondary:
    "bg-linear-0 from-neutral-950 to-neutral-800   shadow-[inset_0px_2px_1px_rgba(255,255,255,0.1)]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn("px-3 py-1  rounded-md", buttonStyles[variant], className)}
    >
      {children}
    </button>
  );
}
