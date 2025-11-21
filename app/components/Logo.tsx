import { cn } from "../lib/util";

export default function Logo({ size = 60 }: { size: number }) {
  return (
    <div
      className={cn(
        "font-bold  relative  bg-clip-text text-transparent bg-linear-90  from-green-400 to-green-600 tracking-tight"
      )}
      style={{ fontSize: size }}
    >
      FlowAI
      <div className="absolute bottom-1    blur-sm w-full h-2 bg-green-500/4  "></div>
    </div>
  );
}
