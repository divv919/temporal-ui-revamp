import { Layers, Layers2 } from "lucide-react";
import { cn } from "../lib/util";

export default function Logo({ size = 60 }: { size: number }) {
  return (
    <div
      className={cn(
        " font-bold tracking-tight text-4xl  relative flex gap-2 items-center bg-clip-text  text-green-400 "
      )}
      style={{ fontSize: size }}
    >
      <div>
        <Layers size={20} />
      </div>
      FlowAI
      <div className="absolute bottom-1    blur-sm w-full h-2 bg-green-500/4  "></div>
    </div>
  );
}
